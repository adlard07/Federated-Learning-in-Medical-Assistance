import React from 'react';
import axios from 'axios';

const Home = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/home');
      console.log('Logout successful!');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <div className="card">
      </div>
    </div>
  );
};

export default Home;
