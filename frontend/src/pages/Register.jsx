import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/auth/register", form);
        navigate("/login");
    };

    return (
        <div>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <select name="role" onChange={handleChange}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
            </select>
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
};

export default Register;
