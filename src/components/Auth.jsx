import { useState } from 'react';
import axios from 'axios';

const Auth = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'client' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/login' : '/signup';
    try {
      const response = await axios.post(`https://testing-render-demo.onrender.com${endpoint}`, formData);
      setUser(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <input type="text" placeholder="Name" required
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="border p-2 w-full" />
        )}
        <input type="email" placeholder="Email" required
          value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="border p-2 w-full" />
        <input type="password" placeholder="Password" required
          value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="border p-2 w-full" />
        {!isLogin && (
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="border p-2 w-full">
            <option value="client">Client</option>
            <option value="restaurant_owner">Restaurant Owner</option>
            <option value="admin">Admin</option>
          </select>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-blue-500">
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
