import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await fetch('http://localhost:5555/admin/users');
            const restaurantResponse = await fetch('/restaurants');
            const orderResponse = await fetch('/user/orders'); // Modify this endpoint accordingly

            setUsers(await userResponse.json());
            setRestaurants(await restaurantResponse.json());
            setOrders(await orderResponse.json());
        };

        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-lg mb-4">Admin Dashboard</h2>
            <h3 className="text-lg mb-2">Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name} ({user.role})</li>
                ))}
            </ul>
            <h3 className="text-lg mb-2">Restaurants</h3>
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>{restaurant.name}</li>
                ))}
            </ul>
            <h3 className="text-lg mb-2">Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>Order ID: {order.id}, Status: {order.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
