import express from "express";
import Turf from "../models/Turf.js";
import Owner from "../models/Owner.js";

const router = express.Router();


// Add Turf
router.post("/add-turf", async (req, res) => {
    const { ownerId, name, location, slots, price, phone } = req.body;

    if (!ownerId) {
        return res.status(400).json({ error: "Owner ID is required" });
    }

    try {
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ error: "Owner not found" });
        }

        const turf = new Turf({ owner: ownerId, name, location, slots, price, phone });
        await turf.save();

        const updatedOwner = await Owner.findByIdAndUpdate(
            ownerId,
            { hasTurf: true, turf: turf._id },
            { new: true }
        );

        res.json({ message: "Turf added successfully", turf, owner: updatedOwner });
    } catch (error) {
        console.error("Error adding turf:", error);
        res.status(500).json({ error: "Error adding turf" });
    }
});




router.get("/all", async (req, res) => {
    try {
        const turfs = await Turf.find();
        res.json(turfs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching turfs" });
    }
});

export default router;
