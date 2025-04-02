import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
    const [turfs, setTurfs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTurfs = async () => {
            try {
                const res = await axios.get("http://localhost:5000/turf/all");
                setTurfs(res.data);
            } catch (error) {
                console.error("Error fetching turfs:", error);
            }
        };
        fetchTurfs();
    }, []);

    const handleBooking = (turfId) => {
        navigate(`/book-slot/${turfId}`);  // Redirect to booking page
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Available Turfs</h1>
            <ul>
                {turfs.map((turf) => (
                    <li key={turf._id} style={{ padding: "10px", margin: "10px", background: "#f3f3f3" }}>
                        {turf.name} - {turf.location}
                        <button 
                            style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
                            onClick={() => handleBooking(turf._id)}
                        >
                            Book Slot
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
