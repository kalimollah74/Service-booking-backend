const { createBooking, cancelBooking } = require("../services/booking.service");

const create = async (req, res, next) => {
    try {
        const result = await createBooking(req.user.id, req.body);
        return res.status(201).json({
            message: "Booking created. Please confirm payment to finalize.",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const cancel = async (req, res, next) => {
    try {
        const booking = await cancelBooking(req.user.id, req.params.id);
        return res.status(200).json({
            message: "Booking cancelled successfully",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    cancel,
};