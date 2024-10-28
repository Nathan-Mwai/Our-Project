import React, { useEffect, useState } from 'react';

const PastOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/user/orders', {
                method: 'GET',
                credentials: 'include', // Make sure to include credentials for session
            });
            const data = await response.json();
            setOrders(data.orders);
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-lg mb-4">Your Past Orders</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id} className="border p-2 mb-2">
                        Order ID: {order.id}, Status: {order.status}, Total: ${order.total_price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PastOrders;
