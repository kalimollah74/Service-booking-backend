const { validationResult } = require("express-validator");

const validateMiddleware = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        console.log("Request body during validation:", req.body);

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }

    next();
};

module.exports = validateMiddleware;