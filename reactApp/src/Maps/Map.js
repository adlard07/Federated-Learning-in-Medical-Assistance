import React, { useState } from 'react';
import axios from 'axios';
import './Map.css';

const Maps = () => {
  const [hospitals, setHospitals] = useState('');
  const [hospitalData, setHospitalData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/hospitals', {
        hospitals: hospitals,
      });

      setHospitalData(response.data);
    } catch (error) {
      setError('Error during searching. Please try again.');
      console.error('Error during searching:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Search Closest Hospitals and Clinics</h2>
        <form onSubmit={handleSearch}> 
          <label>
            <input type="text" value={hospitals} onChange={(e) => setHospitals(e.target.value)} />
          </label>
          <button type="submit">Search</button>
        </form>

        {error && <p className="error-message">{error}</p>}
      </div>

      {hospitalData && (
        <div>
          <h3>Search Results</h3>
          {hospitalData.map((hospital, index) => (
            <div className="hospital-card" key={index}>
              <img src={hospital.image} />
              <div>
                <div>
                  <h4>{hospital.name}</h4>
                  <p>{hospital.address}</p>
                  <h4>Rating: {hospital.rating}⭐</h4>
                </div>
              </div>
              <button>View More</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Maps;
