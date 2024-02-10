import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Hospital = () => {
  const [hospitalData, setHospitalData] = useState(null);
  const { hospitalId } = useParams(); // Get hospitalId from URL parameter

  useEffect(() => {
    const fetchHospitalData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/hospital/${hospitalId}`); // Fetch hospital data based on hospitalId
        setHospitalData(response.data);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      }
    };

    fetchHospitalData();
  }, [hospitalId]);

  return (
    <div>
      <h2>Hospital Details</h2>
      {hospitalData ? (
        <div>
          <h3>{hospitalData.name}</h3>
          <p>Address: {hospitalData.address}</p>
          {/* Add more hospital information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Hospital;
