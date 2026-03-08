const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { SLOT_STATUS } = require("../utils/constants");

const Slot = sequelize.define(
    "Slot",
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        provider_id: { type: DataTypes.INTEGER, allowNull: false },
        start_time: { type: DataTypes.DATE, allowNull: false },
        end_time: { type: DataTypes.DATE, allowNull: false },
        status: {
            type: DataTypes.ENUM(SLOT_STATUS.AVAILABLE, SLOT_STATUS.BOOKED),
            defaultValue: SLOT_STATUS.AVAILABLE,
            allowNull: false,
        },
    },
    {
        tableName: "slots",
        timestamps: true,
        underscored: true,
    }
);

module.exports = Slot;