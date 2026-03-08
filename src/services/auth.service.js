const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const registerUser = async (payload) => {
    const existingUser = await User.findOne({ where: { email: payload.email } });
    if (existingUser) {
        throw { statusCode: 409, message: "Email already exists" };
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await User.create({
        ...payload,
        password: hashedPassword,
    });

    return user;
};

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw { statusCode: 401, message: "Invalid credentials" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw { statusCode: 401, message: "Invalid credentials" };
    }

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return { user, token };
};

module.exports = {
    registerUser,
    loginUser,
};