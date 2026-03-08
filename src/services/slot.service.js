const { Slot } = require("../models");
const { SLOT_STATUS } = require("../utils/constants");

const createSlot = async (providerId, payload) => {
    if (new Date(payload.end_time) <= new Date(payload.start_time)) {
        throw { statusCode: 400, message: "end_time must be after start_time" };
    }

    const slot = await Slot.create({
        provider_id: providerId,
        start_time: payload.start_time,
        end_time: payload.end_time,
        status: SLOT_STATUS.AVAILABLE,
    });

    return slot;
};

const getAvailableSlots = async () => {
    return await Slot.findAll({
        where: { status: SLOT_STATUS.AVAILABLE },
        order: [["start_time", "ASC"]],
    });
};

module.exports = {
    createSlot,
    getAvailableSlots,
};