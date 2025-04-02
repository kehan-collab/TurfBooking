const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Owner = require("../models/Owner");

const router = express.Router();
const SECRET = "3650965e98594ffaf4e0911aa35281b8236a83d43bda9ac0ce4349233ba5a18a7baf82ceea8a45f3babb4658d0b9e980e31a2a04022f6bd419430cc01592f69d"; // Replace with environment variable

// Register
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        if (role === "user") {
            const user = new User({ name, email, password: hashedPassword });
            await user.save();
        } else {
            const owner = new Owner({ name, email, password: hashedPassword });
            await owner.save();
        }
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: "User already exists" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await Owner.findOne({ email }); // Check Owner first
        let role = "owner";
        let hasTurf = user?.hasTurf || false; // Default `hasTurf` to false

        if (!user) {
            user = await User.findOne({ email }); // Check User
            role = "user";
            hasTurf = false; // Users don’t own turfs
        }

        if (!user) {
            return res.status(400).json({ error: "User not found ❌" });
        }

        // ✅ Fix: Use bcrypt to compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials ❌" });
        }

        // ✅ Fix: Use correct JWT secret key
        const token = jwt.sign({ id: user._id, role }, SECRET, { expiresIn: "1h" });

        res.json({ token, role, hasTurf });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Login failed ❌" });
    }
});



module.exports = router;
