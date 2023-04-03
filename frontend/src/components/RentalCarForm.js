import React, { useState } from 'react';

const RentalCarForm = ({handleSearch}) => {
  const [location, setLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const response = await fetch(`http://${BASE_URL}/api/rental_car_search/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        location: location,
        pickup_date: pickupDate,
        dropoff_date: dropoffDate
      })
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
