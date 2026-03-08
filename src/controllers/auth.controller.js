const { registerUser, loginUser } = require("../services/auth.service");

const register = async (req, res, next) => {
    try {
        console.log("Register req.body:", req.body);

        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        console.log("Login req.body:", req.body);

        const result = await loginUser(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: result.token,
            data: {
                id: result.user.id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
};