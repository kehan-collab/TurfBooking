const express = require("express");
const Booking = require("../models/Booking");
const Turf = require("../models/Turf");
const router = express.Router();

// 📌 POST /book-slot → Book a time slot
// Book a Slot
router.post("/book-slot", async (req, res) => {
    try {
        const { turfId, userId, date, time } = req.body;

        if (!turfId || !userId || !date || !time) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Check if the slot is already booked
        const existingBooking = await Booking.findOne({ turfId, date, time });
        if (existingBooking) {
            return res.status(400).json({ error: "Slot already booked" });
        }

        // Create new booking
        const booking = new Booking({ turfId, userId, date, time });
        await booking.save();

        res.json({ message: "Booking successful", booking });
    } catch (error) {
        console.error("Booking error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// 📌 GET /bookings → Get all bookings for a turf
router.get("/bookings/:turfId", async (req, res) => {
    try {
        const bookings = await Booking.find({ turf: req.params.turfId });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: "Error fetching bookings" });
    }
});

module.exports = router;
