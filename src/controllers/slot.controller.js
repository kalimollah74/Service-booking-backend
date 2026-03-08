const { createSlot, getAvailableSlots } = require("../services/slot.service");

const create = async (req, res, next) => {
    try {
        const slot = await createSlot(req.user.id, req.body);
        return res.status(201).json({
            message: "Slot created successfully",
            data: slot,
        });
    } catch (error) {
        next(error);
    }
};

const getAllAvailable = async (req, res, next) => {
    try {
        const slots = await getAvailableSlots();
        return res.status(200).json({
            message: "Available slots fetched successfully",
            data: slots,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAllAvailable,
};