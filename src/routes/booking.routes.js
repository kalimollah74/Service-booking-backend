const router = require("express").Router();
const { create, cancel } = require("../controllers/booking.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validateMiddleware = require("../middlewares/validate.middleware");
const { createBookingValidator } = require("../validators/booking.validator");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("CUSTOMER"),
    createBookingValidator,
    validateMiddleware,
    create
);

router.patch(
    "/:id/cancel",
    authMiddleware,
    roleMiddleware("CUSTOMER"),
    cancel
);

module.exports = router;