const { body } = require("express-validator");

const confirmPaymentValidator = [
    body("booking_id").isInt().withMessage("Valid booking_id is required"),
    body("payment_success")
        .isBoolean()
        .withMessage("payment_success must be boolean"),
];

module.exports = {
    confirmPaymentValidator,
};