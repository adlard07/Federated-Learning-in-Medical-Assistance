import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: username,
        password: password
      });

      console.log(response.data.message);
      if (response.data.message === 'Login Successful!') {
        navigate('/index');
      } else {
        setError('Invalid username or password.'); // Set error state if login fails
      }
    } catch (error) {
      setError('Error during login. Please try again.'); // Set error state if request fails
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if there is one */}
      <form onSubmit={handleLogin}> {/* Use onSubmit instead of onClick for form submission */}
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button> {/* Use type="submit" for form submission */}
      </form>
    </div>
  );
};

export default LoginForm;
