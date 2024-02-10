import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css'; 

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        email: email,
        username: username,
        password: password
      });

      console.log(response.data.message);
    } catch (error) {
      setError('Error during signup. Please try again.'); // Set error state
      console.error('Error during signup:', error);
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if there is one */}
      <form onSubmit={handleSignup}> {/* Use onSubmit instead of onClick for form submission */}
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Signup</button> {/* Use type="submit" for form submission */}
      </form>
    </div>
  );
};

export default SignupPage;
