import React, { useState } from 'react';

const OrderForm = ({ restaurantId, onOrderPlaced }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [deliveryTime, setDeliveryTime] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/user/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ total_price: totalPrice, delivery_time: deliveryTime, delivery_address: deliveryAddress, restaurant_id: restaurantId }),
        });

        const data = await response.json();
        if (response.ok) {
            onOrderPlaced(data);
        } else {
            console.error(data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
            <h2 className="text-lg mb-4">Place Order</h2>
            <input type="number" placeholder="Total Price" onChange={(e) => setTotalPrice(e.target.value)} className="border p-2 mb-2 w-full" required />
            <input type="text" placeholder="Delivery Time" onChange={(e) => setDeliveryTime(e.target.value)} className="border p-2 mb-2 w-full" required />
            <input type="text" placeholder="Delivery Address" onChange={(e) => setDeliveryAddress(e.target.value)} className="border p-2 mb-2 w-full" required />
            <button type="submit" className="bg-blue-500 text-white p-2">Place Order</button>
        </form>
    );
};

export default OrderForm;
