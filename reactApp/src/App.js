import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login/Login';
import Signup from './Signup/Signup.js';
import Home from './Home/Home.js';
import Maps from './Maps/Map.js';
import './App.css';


const Navbar = () => {
  return (
    <div className="navbar">
      <p1>Federated Learning in Medical Assistance</p1>
      <ul className='options'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/map">Map</Link></li>
      </ul>
    </div>
  );
};

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/map" element={<Maps />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
