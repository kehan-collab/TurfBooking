import { useEffect, useState } from "react";
import axios from "axios";

const OwnerDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/bookings", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };
        fetchBookings();
    }, []);

    return (
        <div>
            <h2>Owner Dashboard</h2>
            <h3>Booked Slots</h3>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div key={booking._id}>
                        <p><b>User:</b> {booking.user.name}</p>
                        <p><b>Date:</b> {booking.date}</p>
                        <p><b>Time Slot:</b> {booking.timeSlot}</p>
                    </div>
                ))
            ) : (
                <p>No bookings yet.</p>
            )}
        </div>
    );
};

export default OwnerDashboard;
