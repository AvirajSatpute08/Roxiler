import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stores", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => setStores(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>{store.name} - {store.address} (Rating: {store.rating})</li>
        ))}
      </ul>
      <button onClick={() => navigate("/admin/dashboard")}>Back to Dashboard</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default StoreList;
