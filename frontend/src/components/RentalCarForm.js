import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const RentalCarForm = () => {
  const { authTokens } = useContext(AuthContext);
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const searchData = {
      location,
      pickup_date: pickupDate,
      dropoff_date: dropoffDate,
    };

    const response = await fetch('/api/rental_car_search/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'client_id': '4492e1f0',
        Authorization: `Bearer ${authTokens.access_token}`,
      },
      body: JSON.stringify(searchData),
    });

    if (response.ok) {
      const data = await response.json();
      setResult(data);
      setError(null);
    } else {
      const errorData = await response.json();
      setError(errorData.error_description || 'Unknown error occurred');
      setResult(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label htmlFor="pickupDate">Pickup Date:</label>
        <input
          type="date"
          id="pickupDate"
          value={pickupDate}
          onChange={(e) => setPickupDate(e.target.value)}
        />

        <label htmlFor="dropoffDate">Dropoff Date:</label>
        <input
          type="date"
          id="dropoffDate"
          value={dropoffDate}
          onChange={(e) => setDropoffDate(e.target.value)}
        />

        <button type="submit">Search</button>
      </form>

      {error && (
        <div>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}

      {result && (
        <div>
          <h3>Results:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RentalCarForm;