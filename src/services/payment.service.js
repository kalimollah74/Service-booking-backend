const sequelize = require("../config/db");
const { Booking, Payment, Slot } = require("../models");
const {
    PAYMENT_STATUS,
    BOOKING_STATUS,
    SLOT_STATUS,
} = require("../utils/constants");

const confirmPayment = async ({ booking_id, payment_success }) => {
    const transaction = await sequelize.transaction();

    try {
        const booking = await Booking.findOne({
            where: { id: booking_id },
            include: [
                { model: Payment, as: "payment" },
                { model: Slot, as: "slot" },
            ],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!booking) {
            throw { statusCode: 404, message: "Booking not found" };
        }

        if (booking.status === BOOKING_STATUS.CONFIRMED) {
            throw { statusCode: 400, message: "Booking already confirmed" };
        }

        if (booking.status === BOOKING_STATUS.CANCELLED) {
            throw { statusCode: 400, message: "Cancelled booking cannot be paid" };
        }

        if (!payment_success) {
            booking.status = BOOKING_STATUS.PAYMENT_FAILED;
            booking.payment.status = PAYMENT_STATUS.FAILED;

            await booking.save({ transaction });
            await booking.payment.save({ transaction });
            await transaction.commit();

            return {
                message: "Payment failed",
                booking,
            };
        }

        if (booking.slot.status !== SLOT_STATUS.AVAILABLE) {
            throw { statusCode: 409, message: "Slot is no longer available" };
        }

        booking.payment.status = PAYMENT_STATUS.SUCCESS;
        booking.status = BOOKING_STATUS.CONFIRMED;
        booking.slot.status = SLOT_STATUS.BOOKED;

        await booking.payment.save({ transaction });
        await booking.save({ transaction });
        await booking.slot.save({ transaction });

        await transaction.commit();

        return {
            message: "Payment confirmed and booking finalized",
            booking,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    confirmPayment,
};