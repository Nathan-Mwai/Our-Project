import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Menu = () => {
    const { restaurantId } = useParams();
    const [menuItems, setMenuItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [deliveryAddress, setDeliveryAddress] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            const response = await fetch(`/restaurant/${restaurantId}/menu`);
            const data = await response.json();
            setMenuItems(data.menu_items);
        };
        
        fetchMenu();
    }, [restaurantId]);

    const handleAddToOrder = (item) => {
        setOrderItems((prevItems) => [...prevItems, item]);
    };

    const handlePlaceOrder = async () => {
        const response = await fetch('/user/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                delivery_address: deliveryAddress,
                restaurant_id: restaurantId,
                items: orderItems,
            }),
            credentials: 'include',
        });

        if (response.ok) {
            alert('Order placed successfully!');
            setOrderItems([]); // Clear order items
            setDeliveryAddress(''); // Clear delivery address
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || 'Unable to place order'}`);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <input 
                type="text" 
                placeholder="Delivery Address" 
                value={deliveryAddress} 
                onChange={(e) => setDeliveryAddress(e.target.value)} 
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
            />
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p>{item.description}</p>
                        <p className="font-bold">${item.price}</p>
                        <button 
                            onClick={() => handleAddToOrder(item)} 
                            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Add to Order
                        </button>
                    </li>
                ))}
            </ul>
            <button 
                onClick={handlePlaceOrder} 
                disabled={orderItems.length === 0} 
                className={`mt-4 bg-green-500 text-white px-6 py-2 rounded-md ${orderItems.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
            >
                Place Order
            </button>
        </div>
    );
};

export default Menu;
