import { useState } from 'react';
import Auth from './components/Auth';
import Restaurants from './components/Restaurants';
import RestaurantMenu from './components/RestaurantMenu';
import UserOrders from './components/UserOrders';

function App() {
  const [user, setUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <h1 className="text-3xl text-center">Welcome, {user.email}</h1>
          <Restaurants setSelectedRestaurant={setSelectedRestaurant} />
          {selectedRestaurant && <RestaurantMenu restaurantId={selectedRestaurant} />}
          <UserOrders />
        </>
      )}
    </div>
  );
}

export default App;
