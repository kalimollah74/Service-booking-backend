const { confirmPayment } = require("../services/payment.service");

const confirm = async (req, res, next) => {
    try {
        const result = await confirmPayment(req.body);
        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    confirm,
};