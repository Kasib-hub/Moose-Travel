import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from './context/AuthContext';

const RentalCarForm = () => {
  const { avisToken } = useContext(AuthContext);
  const [brand, setBrand] = useState('Avis');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [airportIATACodes, setAirportIATACodes] = useState([]);

  useEffect(() => {
    const fetchAirportData = async () => {
      try {
        const response = await axios.get('/src/data/airports.json');
        setAirportIATACodes(response.data);
      } catch (error) {
        console.error('Error fetching airport data:', error);
      }
    };

    fetchAirportData();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getCarAvailability = async (searchData) => {
    const url = new URL("https://stage.abgapiservices.com/cars/catalog/v1/vehicles");
    url.search = new URLSearchParams({
      brand: searchData.brand,
      pickup_date: searchData.pickup_date.toISOString(),
      pickup_location: searchData.pickup_location,
      dropoff_date: searchData.dropoff_date.toISOString(),
      dropoff_location: searchData.dropoff_location,
      country_code: searchData.country_code,
      iata_number: "0104724P",
      transaction_id: "23492034738",
    });

    try {
      setError(null);
      setResult(null);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${avisToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!pickupDate.trim() || !pickupLocation.trim() || !dropoffDate.trim() || !dropoffLocation.trim() || !countryCode.trim()) {
      setError('Please fill out all required fields');
      return;
    }

    try {
      const searchData = {
        brand,
        pickup_date: new Date(pickupDate),
        pickup_location: pickupLocation,
        dropoff_date: new Date(dropoffDate),
        dropoff_location: dropoffLocation,
        country_code: countryCode,
      };

      await getCarAvailability(searchData);
    } catch (error) {
      setError('Invalid date format');
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="brand">Brand:</label>
      <select
        name="brand"
        id="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="Avis">Avis</option>
        <option value="Budget">Budget</option>
        <option value="Payless">Payless</option>
      </select>

      <label htmlFor="pickupDate">Pickup Date:</label>
      <input
        type="datetime-local"
        id="pickupDate"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
      />

      <label htmlFor="pickupLocation">Pickup Location (Airport Name):</label>
      <select
        id="pickupLocation"
        value={pickupLocation}
        onChange={(e) => setPickupLocation(e.target.value)}
      >
        <option value="">Select an airport</option>
        {airportIATACodes.map((airport) => (
          <option key={airport.iata_code} value={airport.iata_code}>
            {airport.name}
          </option>
        ))}
      </select>

      <label htmlFor="dropoffDate">Dropoff Date:</label>
      <input
        type="datetime-local"
        id="dropoffDate"
        value={dropoffDate}
        onChange={(e) => setDropoffDate(e.target.value)}
      />

      <label htmlFor="dropoffLocation">Dropoff Location (Airport Name):</label>
      <select
        id="dropoffLocation"
        value={dropoffLocation}
        onChange={(e) => setDropoffLocation(e.target.value)}
      >
        <option value="">Select an airport</option>
        {airportIATACodes.map((airport) => (
          <option key={airport.iata_code} value={airport.iata_code}>
            {airport.name}
          </option>
        ))}
      </select>

      <label htmlFor="countryCode">Country Code:</label>
      <input
        type="text"
        id="countryCode"
        value={countryCode}
        onChange={(e) => setCountryCode(e.target.value)}
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
          <h3>Formatted Results:</h3>
          <ul>
            {result.map((car, index) => (
              <li key={index}>
                <h4>{car.vehicle_info.make_model.name}</h4>
                <p>Category: {car.vehicle_info.category}</p>
                <p>Seats: {car.vehicle_info.seating_capacity}</p>
                <p>Pickup Date: {formatDate(car.reservation.pickup_date)}</p>
                <p>Dropoff Date: {formatDate(car.reservation.dropoff_date)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
  
  export default RentalCarForm;