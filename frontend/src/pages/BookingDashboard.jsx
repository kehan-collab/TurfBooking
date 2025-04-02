import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

const BookingDashboard = () => {
    const { turfId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [turf, setTurf] = useState(null);
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");

    useEffect(() => {
        const fetchTurfDetails = async () => {
            try {
                const res = await API.get(`/turf/${turfId}`);
                setTurf(res.data);
            } catch (err) {
                console.error("Error fetching turf details", err);
            }
        };
        fetchTurfDetails();
    }, [turfId]);

    const handleBooking = async () => {
        if (!date || !timeSlot) {
            alert("Please select a date and time slot.");
            return;
        }
        try {
            const res = await API.post("/booking/book", { turfId, date, timeSlot }, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            alert(res.data.message);
            navigate("/dashboard"); // Redirect to user dashboard after booking
        } catch (error) {
            alert("Error booking slot: " + error.response.data.message);
        }
    };

    if (!turf) return <p>Loading turf details...</p>;

    return (
        <div>
            <h1>Booking for {turf.name}</h1>
            <p>📍 Location: {turf.location}</p>
            <p>💲 Price per slot: {turf.price}</p>

            <label>Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

            <label>Time Slot:</label>
            <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
                <option value="">Select Time Slot</option>
                <option value="08:00 AM - 09:00 AM">08:00 AM - 09:00 AM</option>
                <option value="09:00 AM - 10:00 AM">09:00 AM - 10:00 AM</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            </select>

            <button onClick={handleBooking}>Confirm Booking</button>
        </div>
    );
};

export default BookingDashboard;
