import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/dashboard", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => setStats(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to login
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>
      <button onClick={() => navigate("/admin/stores")}>View Stores</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
