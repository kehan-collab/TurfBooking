import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(); // ✅ Ensure correct export

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const id = localStorage.getItem("userId"); // ✅ Retrieve stored userId

        if (token && role && id) {
            setUser({ token, role, id });
        }
    }, []);

    const login = (token, role, id) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("userId", id); // ✅ Store userId in localStorage

        setUser({ token, role, id }); // ✅ Include id in state
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId"); // ✅ Remove userId on logout
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
