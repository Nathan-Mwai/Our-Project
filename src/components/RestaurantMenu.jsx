import { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantMenu = ({ restaurantId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`https://testing-render-demo.onrender.com/restaurant/${restaurantId}/menu`);
        setMenuItems(response.data.menu_items);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching menu");
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const handleAddToOrder = (item) => {
    setOrder((prevOrder) => [...prevOrder, item]);
    alert(`${item.name} added to your order!`); // You can change this to a better UI/UX method.
  };

  const handlePlaceOrder = async () => {
    if (order.length === 0) {
      alert("Please add items to your order before placing it.");
      return;
    }

    const total_price = order.reduce((total, item) => total + item.price, 0);
    const delivery_time = "30 minutes"; // Example static delivery time
    const delivery_address = prompt("Please enter your delivery address:");

    const orderData = {
      total_price,
      delivery_time,
      delivery_address,
      restaurant_id: restaurantId,
    };

    try {
      await axios.post('https://testing-render-demo.onrender.com/user/orders', orderData, { withCredentials: true });
      alert("Order placed successfully!");
      setOrder([]); // Clear the order after placing
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl mb-4">Menu</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
            <img src={item.image} alt={item.name} className="mt-2 rounded-lg h-40 object-cover" />
            <button
              onClick={() => handleAddToOrder(item)}
              className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-300"
            >
              Add to Order
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl">Your Order</h3>
        <ul className="space-y-2">
          {order.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 transition-colors duration-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default RestaurantMenu;
