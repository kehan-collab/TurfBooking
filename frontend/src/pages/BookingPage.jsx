import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
    const { turfId } = useParams(); // Get turf ID from the URL
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();

    const handleBooking = async () => {
        console.log("Booking Details:", { turfId, date, time });
    
        try {
            const token = localStorage.getItem("token"); 
            const userId = localStorage.getItem("userId");
    
            if (!userId || !token) {
                alert("User not logged in! ❌");
                navigate("/login");
                return;
            }
    
            if (!turfId || !date || !time) {
                alert("Please select a valid date and time ❌");
                return;
            }
    
            const res = await axios.post(
                "http://localhost:5000/booking/book-slot",
                { turfId, userId, date, time },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            alert("Booking Successful! ✅");
            navigate("/user-dashboard");
        } catch (error) {
            console.error("Booking Error:", error.response?.data || error);
            alert(error.response?.data?.error || "Booking Failed ❌");
        }
    };
    
    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Book Slot</h1>
            <p>Select your date and time for the turf</p>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            <button onClick={handleBooking} style={{ marginLeft: "10px" }}>Confirm Booking</button>
        </div>
    );
};

export default BookingPage;
