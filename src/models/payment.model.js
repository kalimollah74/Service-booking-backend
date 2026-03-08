const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { PAYMENT_STATUS } = require("../utils/constants");

const Payment = sequelize.define(
    "Payment",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        booking_id: { type: DataTypes.INTEGER, allowNull: false },
        amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
        status: {
            type: DataTypes.ENUM(
                PAYMENT_STATUS.PENDING,
                PAYMENT_STATUS.SUCCESS,
                PAYMENT_STATUS.FAILED
            ),
            defaultValue: PAYMENT_STATUS.PENDING,
            allowNull: false,
        },
        transaction_ref: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "payments",
        timestamps: true,
        underscored: true,
    }
);

module.exports = Payment;