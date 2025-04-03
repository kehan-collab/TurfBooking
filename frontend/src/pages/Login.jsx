import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async () => {
        console.log("Submitting Login Data:", form); // 🔍 Debugging

        try {
            const res = await axios.post("http://localhost:5000/auth/login", form);
            const { token, id, role, hasTurf } = res.data; // ✅ Now includes `id`

            login(token, role, id); // ✅ Pass `id` to AuthContext or handle it

            localStorage.setItem("userId", id); // ✅ Store `id` in local storage for future use

            if (role === "owner" && !hasTurf) {
                navigate("/add-turf");
            } else {
                navigate(role === "owner" ? "/owner-dashboard" : "/user-dashboard");
            }
        } catch (error) {
            console.error("Login Error:", error.response?.data || error);
            alert(error.response?.data?.error || "Login failed!");
        }
    };

    return (
        <div>
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button onClick={handleSubmit}>Login</button>
        </div>
    );
};

export default Login;
