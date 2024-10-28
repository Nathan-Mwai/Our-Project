import { useEffect, useState } from 'react';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get('http://localhost:5555/user/orders', { withCredentials: true });
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl">Your Orders</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4">
            <p>Status: {order.status}</p>
            <p>Total Price: {order.total_price}</p>
            <p>Delivery Time: {order.delivery_time}</p>
            <p>Address: {order.delivery_address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserOrders;
