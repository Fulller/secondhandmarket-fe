import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderBuy() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuyerRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/purchase-requests/buyer`);
        setRequests(response.data.data); // Giả định rằng dữ liệu bạn cần nằm trong response.data.data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyerRequests();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
console.log("Đây là dữ liệu abc",requests)
  return (
    <div>
      <h1>Order Buy Page</h1>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            Product ID: {request.productId} - Status: {request.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderBuy;

