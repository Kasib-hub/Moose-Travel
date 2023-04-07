import React, { useState } from 'react';

const RentalCarForm = () => {
  const [brand, setBrand] = useState('Avis');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

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
    }.toString().replace(/,/g, '&'));
    try {
      setError(null);
      setResult(null);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer YOUR_BEARER_TOKEN`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
    } finally {
      console.log('Done');
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

        <label htmlFor="pickupLocation">Pickup Location (Airport Code):</label>
        <input
          type="text"
          id="pickupLocation"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
        />

        <label htmlFor="dropoffDate">Dropoff Date:</label>
        <input
          type="datetime-local"
          id="dropoffDate"
          value={dropoffDate}
          onChange={(e) => setDropoffDate(e.target.value)}
        />

        <label htmlFor="dropoffLocation">Dropoff Location (Airport Code):</label>
        <input
          type="text"
          id="dropoffLocation"
          value={dropoffLocation}
          onChange={(e) => setDropoffLocation(e.target.value)}
        />

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
        </div>
        )}
    </div>
  );
};

export default RentalCarForm;
