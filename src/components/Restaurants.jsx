import { useEffect, useState } from 'react';
import axios from 'axios';

const Restaurants = ({ setSelectedRestaurant }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await axios.get('https://testing-render-demo.onrender.com/restaurants');
      setRestaurants(response.data);
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl">Restaurants</h2>
      <ul className="space-y-4">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id} className="border p-4">
            <h3 className="text-xl">{restaurant.name}</h3>
            <button onClick={() => setSelectedRestaurant(restaurant.id)} className="bg-blue-500 text-white p-2">View Menu</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Restaurants;
