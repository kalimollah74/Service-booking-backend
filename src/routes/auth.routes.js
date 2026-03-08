const router = require("express").Router();
const { register, login } = require("../controllers/auth.controller");
const validateMiddleware = require("../middlewares/validate.middleware");
const {
    registerValidator,
    loginValidator,
} = require("../validators/auth.validator");

router.post("/register", registerValidator, validateMiddleware, register);
router.post("/login", loginValidator, validateMiddleware, login);

module.exports = router;