const { body } = require("express-validator");

const createBookingValidator = [
    body("slot_id").isInt().withMessage("Valid slot_id is required"),
    body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0"),
];

module.exports = {
    createBookingValidator,
};