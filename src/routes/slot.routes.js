const router = require("express").Router();
const { create, getAllAvailable } = require("../controllers/slot.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const validateMiddleware = require("../middlewares/validate.middleware");
const { createSlotValidator } = require("../validators/slot.validator");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("PROVIDER"),
    createSlotValidator,
    validateMiddleware,
    create
);

router.get("/available", getAllAvailable);

module.exports = router;