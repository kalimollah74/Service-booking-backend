const sequelize = require("../config/db");
const { Booking, Slot, Payment } = require("../models");
const {
    SLOT_STATUS,
    BOOKING_STATUS,
    PAYMENT_STATUS,
} = require("../utils/constants");

const createBooking = async (customerId, { slot_id, amount }) => {
    const transaction = await sequelize.transaction();

    try {
        const slot = await Slot.findOne({
            where: { id: slot_id },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!slot) {
            throw { statusCode: 404, message: "Slot not found" };
        }

        if (slot.status !== SLOT_STATUS.AVAILABLE) {
            throw { statusCode: 409, message: "Slot is already booked" };
        }

        const existingActiveBooking = await Booking.findOne({
            where: {
                slot_id,
                status: [BOOKING_STATUS.PENDING_PAYMENT, BOOKING_STATUS.CONFIRMED],
            },
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (existingActiveBooking) {
            throw { statusCode: 409, message: "An active booking already exists for this slot" };
        }

        const booking = await Booking.create(
            {
                slot_id,
                customer_id: customerId,
                status: BOOKING_STATUS.PENDING_PAYMENT,
            },
            { transaction }
        );

        const payment = await Payment.create(
            {
                booking_id: booking.id,
                amount,
                status: PAYMENT_STATUS.PENDING,
                transaction_ref: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            },
            { transaction }
        );

        await transaction.commit();

        return { booking, payment };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const cancelBooking = async (customerId, bookingId) => {
    const transaction = await sequelize.transaction();

    try {
        const booking = await Booking.findOne({
            where: { id: bookingId, customer_id: customerId },
            include: [{ model: Slot, as: "slot" }],
            transaction,
            lock: transaction.LOCK.UPDATE,
        });

        if (!booking) {
            throw { statusCode: 404, message: "Booking not found" };
        }

        if (booking.status === BOOKING_STATUS.CANCELLED) {
            throw { statusCode: 400, message: "Booking already cancelled" };
        }

        booking.status = BOOKING_STATUS.CANCELLED;
        await booking.save({ transaction });

        if (booking.slot.status === SLOT_STATUS.BOOKED) {
            booking.slot.status = SLOT_STATUS.AVAILABLE;
            await booking.slot.save({ transaction });
        }

        await transaction.commit();
        return booking;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    createBooking,
    cancelBooking,
};