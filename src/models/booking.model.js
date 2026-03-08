const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { BOOKING_STATUS } = require("../utils/constants");

const Booking = sequelize.define(
    "Booking",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        slot_id: { type: DataTypes.INTEGER, allowNull: false },
        customer_id: { type: DataTypes.INTEGER, allowNull: false },
        status: {
            type: DataTypes.ENUM(
                BOOKING_STATUS.PENDING_PAYMENT,
                BOOKING_STATUS.CONFIRMED,
                BOOKING_STATUS.CANCELLED,
                BOOKING_STATUS.PAYMENT_FAILED
            ),
            defaultValue: BOOKING_STATUS.PENDING_PAYMENT,
            allowNull: false,
        },
        booked_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "bookings",
        timestamps: true,
        underscored: true,
    }
);

module.exports = Booking;