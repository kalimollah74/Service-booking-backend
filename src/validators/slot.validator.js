const { body } = require("express-validator");

const createSlotValidator = [
    body("start_time").isISO8601().withMessage("Valid start_time is required"),
    body("end_time").isISO8601().withMessage("Valid end_time is required"),
];

module.exports = {
    createSlotValidator,
};