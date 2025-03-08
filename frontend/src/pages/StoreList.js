import { useEffect, useState } from "react";
import axios from "axios";

const StoreList = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/stores", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((response) => setStores(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Stores</h1>
      <ul>
        {stores.map((store) => (
          <li key={store.id}>{store.name} - {store.address} (Rating: {store.rating})</li>
        ))}
      </ul>
    </div>
  );
};

export default StoreList;
