const User = require("./user.model");
const Slot = require("./slot.model");
const Booking = require("./booking.model");
const Payment = require("./payment.model");

User.hasMany(Slot, { foreignKey: "provider_id", as: "slots" });
Slot.belongsTo(User, { foreignKey: "provider_id", as: "provider" });

User.hasMany(Booking, { foreignKey: "customer_id", as: "bookings" });
Booking.belongsTo(User, { foreignKey: "customer_id", as: "customer" });

Slot.hasMany(Booking, { foreignKey: "slot_id", as: "bookings" });
Booking.belongsTo(Slot, { foreignKey: "slot_id", as: "slot" });

Booking.hasOne(Payment, { foreignKey: "booking_id", as: "payment" });
Payment.belongsTo(Booking, { foreignKey: "booking_id", as: "booking" });

module.exports = {
    User,
    Slot,
    Booking,
    Payment,
};