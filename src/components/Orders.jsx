import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const response = await fetch('/user/orders', {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data.orders);
            } else {
                alert('Failed to fetch orders');
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
            <ul className="space-y-4">
                {orders.length === 0 ? (
                    <li className="bg-gray-100 p-4 rounded-lg shadow-md">No orders found.</li>
                ) : (
                    orders.map((order) => (
                        <li key={order.id} className="bg-white p-4 rounded-lg shadow-md">
                            <p className="font-semibold">Status: <span className="font-normal">{order.status}</span></p>
                            <p className="font-semibold">Total Price: <span className="font-normal">${order.total_price}</span></p>
                            <p className="font-semibold">Delivery Time: <span className="font-normal">{new Date(order.delivery_time).toLocaleString()}</span></p>
                            <p className="font-semibold">Delivery Address: <span className="font-normal">{order.delivery_address}</span></p>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default Orders;
