import React, { useState } from "react";
import Axios from "axios";
import Header from "../Components/header/header";
import "../Styles/hospitals.css";

const Hospital = () => {
  const [address, setAddress] = useState("");
  const [hospitalData, setHospitalData] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post('http://127.0.0.1:5000/hospitals', { address });
      const resp = response.data;
      setHospitalData(resp);
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    }
  };

  return (
    <div className="container">
          <Header/>
        <div className="hospital-container">
          <div className="search-bar">
            <form onSubmit={handleSubmit}>
              <label>Search hospitals</label><br/>
              <input type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <button type="submit" className="submit-button">Search</button>
            </form>
          </div>
          <br/>
          <div className="hospital-list">
            {hospitalData.map((hospital, index) => (
              <div className="hospital-card" key={index}>
                <img src={hospital.image} alt="Hospital" />
                <div className="hospital-info">
                  <h3>{hospital.name}</h3>
                  <p>Address: {hospital.address}</p>
                  <p>Phone Number: {hospital.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default Hospital;
