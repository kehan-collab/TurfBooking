const mongoose = require("mongoose");

const OwnerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    hasTurf: { type: Boolean, default: false },
    turf: { type: mongoose.Schema.Types.ObjectId, ref: "Turf" } // 🔥 Reference to Turf
});

module.exports = mongoose.model("Owner", OwnerSchema);
