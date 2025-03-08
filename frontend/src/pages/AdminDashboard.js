import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/dashboard", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => setStats(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>
    </div>
  );
};

export default AdminDashboard;
