import { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantMenu = ({ restaurantId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/restaurant/${restaurantId}/menu`);
        setMenuItems(response.data.menu_items);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching menu");
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
