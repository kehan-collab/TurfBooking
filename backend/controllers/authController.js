const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Owner = require("../models/Owner");

const registerOwner = async (req, res) => {
  try {
    const { name, email, password, phone, turfName, location, price, availableSlots } = req.body;

    // ✅ Check if all required fields are provided
    if (!name || !email || !password || !phone || !turfName || !location || !price || !availableSlots) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // ✅ Ensure price is a number
    if (isNaN(price)) {
      return res.status(400).json({ message: "Price must be a valid number" });
    }

    // ✅ Ensure availableSlots is an array
    if (!Array.isArray(availableSlots) || availableSlots.length === 0) {
      return res.status(400).json({ message: "Available slots must be an array with at least one slot" });
    }

    // ✅ Check if owner already exists
    const existingOwner = await Owner.findOne({ email });
    if (existingOwner) return res.status(400).json({ message: "Owner already registered" });

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new owner
    const newOwner = new Owner({
      name,
      email,
      password: hashedPassword,
      phone,
      turfName,
      location,
      price,
      availableSlots
    });

    await newOwner.save();

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: newOwner._id, role: "owner" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Owner registered successfully!", token });

  } catch (error) {
    console.error("Error in registerOwner:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { registerOwner };
