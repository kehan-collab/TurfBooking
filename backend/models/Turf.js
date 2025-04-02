const mongoose = require("mongoose");

const TurfSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Owner" },
    name: String,
    location: String,
    slots: [String],
    price: Number,
    phone: String,
});

module.exports = mongoose.model("Turf", TurfSchema);
