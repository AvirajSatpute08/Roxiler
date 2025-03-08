import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StoreList from "./pages/StoreList";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if user is logged in

  return (
    <Router>
      <Routes>
        {/* Login page as the default route */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes (Require Login) */}
        <Route 
          path="/admin/dashboard" 
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/" />} 
        />
        <Route 
          path="/admin/stores" 
          element={isAuthenticated ? <StoreList /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
