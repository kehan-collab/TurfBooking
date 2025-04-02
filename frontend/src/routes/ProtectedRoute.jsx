import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
    const { user } = useAuth();

    if (user === null) return <div>Loading...</div>; // ✅ Prevents undefined errors

    if (!user?.token) return <Navigate to="/login" />;
    if (user.role !== role) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
