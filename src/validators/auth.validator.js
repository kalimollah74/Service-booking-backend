const { body } = require("express-validator");
const { ROLES } = require("../utils/constants");

const registerValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .notEmpty()
        .withMessage("Role is required")
        .isIn([ROLES.ADMIN, ROLES.PROVIDER, ROLES.CUSTOMER])
        .withMessage("Invalid role"),
];

const loginValidator = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Valid email is required"),

    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required"),
];

module.exports = {
    registerValidator,
    loginValidator,
};