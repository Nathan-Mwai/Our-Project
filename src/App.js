import { useState } from 'react';
import Auth from './components/Auth';
import Restaurants from './components/Restaurants';
import RestaurantMenu from './components/RestaurantMenu';
import UserOrders from './components/UserOrders';
import { BrowserRouter } from 'react-router-dom';
import Logout from './components/Logout'; // Import the Logout component
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const handleLogout = async () => {
    try {
      await axios.delete('/logout', {}, { withCredentials: true });
      setUser(null); // Clear the user state
      setSelectedRestaurant(null); // Clear the selected restaurant if needed
      // Optionally, clear any other local state or storage
      localStorage.removeItem('userToken'); // If using local storage for tokens
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
        <BrowserRouter>
      {!user ? (
        <Auth setUser={setUser} />
      ) : (
        <>
          <h1 className="text-3xl text-center">Welcome, {user.email}</h1>
          <Logout handleLogout={handleLogout} /> {/* Place the Logout button */}
          <Restaurants setSelectedRestaurant={setSelectedRestaurant} />
          {selectedRestaurant && <RestaurantMenu restaurantId={selectedRestaurant} />}
          <UserOrders />
        </>
      )}
      </BrowserRouter>
    </div>
  );
}

export default App;
