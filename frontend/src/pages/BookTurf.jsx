import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

const BookTurf = () => {
    const { turfId } = useParams();
    const navigate = useNavigate();
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");

    const handleBooking = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("User not logged in! Please log in first.");
            navigate("/login");
            return;
        }

        if (!date || !timeSlot) {
            alert("Please select a date and time slot!");
            return;
        }

        try {
            const response = await API.post("/turf/book", { userId, turfId, date, timeSlot });
            alert(response.data.message);  // Show backend response message
            navigate("/dashboard");
        } catch (error) {
            console.error("Booking failed", error);
            alert(error.response?.data?.message || "Booking failed. Try again.");
        }
    };

    return (
        <div>
            <h1>Book Turf Slot</h1>
            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>Time Slot:</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                <option value="">Select Time</option>
                <option value="6AM-8AM">6AM-8AM</option>
                <option value="8AM-10AM">8AM-10AM</option>
                <option value="10AM-12PM">10AM-12PM</option>
                <option value="4PM-6PM">4PM-6PM</option>
                <option value="6PM-8PM">6PM-8PM</option>
            </select>

            <button onClick={handleBooking}>Confirm Booking</button>
        </div>
    );
};

export default BookTurf;
