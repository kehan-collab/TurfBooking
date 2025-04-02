import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddTurf from "./pages/AddTurf";
import BookingPage from "./pages/BookingPage";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
            <Route path="/owner-dashboard" element={<ProtectedRoute role="owner"><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/add-turf" element={<ProtectedRoute role="owner"><AddTurf /></ProtectedRoute>} />
            <Route path="/book-slot/:turfId" element={<ProtectedRoute role="user"><BookingPage /></ProtectedRoute>} />
        </Routes>
);

export default App;
