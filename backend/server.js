import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import turfRoutes from "./routes/turf.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js"; // ✅ Import this

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/turf", turfRoutes);
app.use("/booking", bookingRoutes);  // ✅ Ensure this line is present

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));
