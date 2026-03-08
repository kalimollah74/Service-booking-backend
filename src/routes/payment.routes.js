const router = require("express").Router();
const { confirm } = require("../controllers/payment.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
    confirmPaymentValidator,
} = require("../validators/payment.validator");

router.post(
    "/confirm-payment",
    authMiddleware,
    confirmPaymentValidator,
    validateMiddleware,
    confirm
);

module.exports = router;