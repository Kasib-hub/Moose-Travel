import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import { createCar } from '../api/Rental/Rental';
import { useParams } from 'react-router-dom';
// import createRen

const RentalCarForm = ({ChangeRoute}) => {
  const { avisToken, authTokens, user } = useContext(AuthContext);
  const { itineraryID } = useParams();

  const [brand, setBrand] = useState('Avis');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffDate, setDropoffDate] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [airportIATACodes, setAirportIATACodes] = useState([]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  const getCarAvailability = async (searchData) => {
    const url = new URL("https://stage.abgapiservices.com/cars/catalog/v1/vehicles");
    url.search = new URLSearchParams({
      brand: searchData.brand,
      pickup_date: searchData.pickup_date.toISOString().split('.')[0],
      pickup_location: searchData.pickup_location,
      dropoff_date: searchData.dropoff_date.toISOString().split('.')[0],
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
          "client_id": process.env.REACT_APP_AVIS_CLIENT_ID,
          "Authorization": `Bearer ${avisToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResult(data.vehicles);
      console.log(data.vehicles)
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

  // make the POST request to the backend to create a new rental car
  const makeRental = async (car) => {
    const rentalObject = {
      "itinerary_id": itineraryID,
      "user_id": user.user_id,
      "model": car.category.model,
      "make": car.category.make,
      "rental_company": brand,
      "price": car.rate_totals.pay_later.reservation_total,
      "pick_up_location": pickupLocation,
      "return_location": dropoffLocation,
      "pick_up_date": pickupDate,
      "return_date": dropoffDate,
    }
    await createCar(authTokens.access, rentalObject, itineraryID)
    ChangeRoute()
  }

  return (
    <div>
      <h1>Rental Car Search</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-boxes">
          <div className='search-input'>
            <label className='label' htmlFor="pickupDate">Pickup Date:</label>
            <input
              type="datetime-local"
              id="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />

            <label className='label' htmlFor="pickupLocation">Pickup Location (Airport Name):</label>
            <input 
              type='text'
              id="pickupLocation"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
            />
            <label className='label' htmlFor="brand">Brand:</label>
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
          </div>
          
          <div className='search-input'>
            <label className='label' htmlFor="dropoffDate">Dropoff Date:</label>
            <input
              type="datetime-local"
              id="dropoffDate"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
            />

            <label className='label' htmlFor="dropoffLocation">Dropoff Location (Airport Name):</label>
            <input 
              type='text'
              id="dropoffLocation"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
            />
            <label className='label' htmlFor="countryCode">Country Code:</label>
            <input
              type="text"
              id="countryCode"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className='submit-btn'>Search</button>
      </form>
  
      {error && (
        <div>
          <h3>Error:</h3>
          <pre>{error}</pre>
        </div>
      )}
  
      {result && (
        <div>
          {result.map((car, index) => (
            <Card key={index} onClick={(e) => makeRental(car)}>
              <img src={car.category.image_url} alt={`${car.category.model} view`} className='car-image' />
              <h4>{car.category.make} {car.category.model}</h4>
              <p>Price: {`$${car.rate_totals.pay_later.reservation_total}`}</p>
              {/* <p>Seats: {car.vehicle_info.seating_capacity}</p>
              <p>Pickup Date: {formatDate(car.reservation.pickup_date)}</p>
              <p>Dropoff Date: {formatDate(car.reservation.dropoff_date)}</p> */}
            </Card>
          ))}
         
        </div>
      )}
    </div>
  );
};
  
  export default RentalCarForm;