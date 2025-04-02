import { useState } from "react";
import { useAuth } from "../context/AuthContext";  // ✅ Import AuthContext
import { useNavigate } from "react-router-dom";
import axios from "axios";  

const AddTurf = () => {
    const [form, setForm] = useState({ name: "", location: "", slots: "", price: "", phone: "" });
    const { user } = useAuth();  // ✅ Get authenticated user
    const ownerId = user?.id;  // ✅ Extract owner ID
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        console.log("User from useAuth():", user);  // ✅ Debugging
        console.log("Extracted Owner ID:", ownerId);  // ✅ Debugging

        if (!user || !ownerId) {
            alert("Error: Owner ID is missing!");
            console.error("Owner ID is undefined. Cannot add turf.");
            return;
        }

        try {
            const token = localStorage.getItem("token");  
            const res = await axios.post(
                "http://localhost:5000/turf/add-turf",
                { ownerId, ...form },  
                { headers: { Authorization: `Bearer ${token}` } }  
            );

            alert("Turf Added Successfully! ✅");
            navigate("/owner-dashboard");
        } catch (error) {
            console.error("Turf Add Error:", error.response?.data || error.message);
            alert("Failed to add turf ❌");
        }
    };

    return (
        <div>
            <input name="name" placeholder="Turf Name" onChange={handleChange} />
            <input name="location" placeholder="Location" onChange={handleChange} />
            <input name="slots" placeholder="Available Slots" onChange={handleChange} />
            <input name="price" placeholder="Price per Slot" onChange={handleChange} />
            <input name="phone" placeholder="Phone Number" onChange={handleChange} />
            <button onClick={handleSubmit}>Add Turf</button>
        </div>
    );
};

export default AddTurf;
