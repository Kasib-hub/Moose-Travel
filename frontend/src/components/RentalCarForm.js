import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Card from 'react-bootstrap/Card';
import { createCar } from '../api/Rental/Rental';
import { useParams } from 'react-router-dom';
import { Autocomplete } from "@react-google-maps/api"
import CountryCodes from '../data/CountryCodes.json';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Moose from '../assets/moose.svg';

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
  const [loading, setLoading] = useState(false)

  const options = {
    types:['airport']
  }

  useEffect(() => {
    setLoading(false)
  }, [result]);

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
    
    if (new Date(pickupDate) >= new Date(dropoffDate)) {
      setError('Pickup date must be before dropoff date');
      setDropoffDate('')
      setPickupDate('')
      return
    }
    if (pickupLocation.length !== 3 || dropoffLocation.length !== 3) {
      setError('Please choose a valid airport that contains a 3 letter IATA code in parenthesis');
      setDropoffLocation('')
      setPickupLocation('')
      return
    }
    const datenow = new Date();
    if (new Date(pickupDate) <= datenow || new Date(dropoffDate) <= datenow) {
      setError('Please choose a date in the future');
      setDropoffDate('')
      setPickupDate('')
      return
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

  const handlePickupBlur = (e) => {
    let regex = /\((.*?)\)/g
    let newStr = e.target.value.match(regex)
    setPickupLocation(newStr[0].replace(/\(|\)/g, ""))
  }

  const handleDropoffBlur = (e) => {
    let regex = /\((.*?)\)/g
    let newStr = e.target.value.match(regex)
    setDropoffLocation(newStr[0].replace(/\(|\)/g, ""))
  }

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
      {error && (
        <Alert key="danger" variant="danger">
          <h3>Error:</h3>
          <pre>{error}</pre>
        </Alert>
      )}
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
            <Autocomplete options={options}>
              <input 
                type='text'
                id="pickupLocation"
                onBlur={handlePickupBlur}
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
            </Autocomplete>

            <label className='label' htmlFor="brand">Brand:</label>
            <Form.Select
              name="brand"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Choose Rental Car Company</option>
              <option value="Avis">Avis</option>
              <option value="Budget">Budget</option>
              <option value="Payless">Payless</option>
            </Form.Select>
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
            <Autocomplete options={options}>
              <input 
                type='text'
                id="dropoffLocation"
                value={dropoffLocation}
                onBlur={handleDropoffBlur}
                onChange={(e) => setDropoffLocation(e.target.value)}
              />
            </Autocomplete>
            
            <label className='label' htmlFor="countryCode">Country Code:</label>

              <Form.Select 
                id="countryCode" 
                name='countryCode' 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="">Select a Country</option>
                <option value="US">United States</option>
                {
                  CountryCodes.map((country, index) => {
                    return (
                      <option key={index} value={country[1]}>{country[0]}</option>
                    )
                  })
                }
              </Form.Select>
          </div>
        </div>
        <button type="submit" className='submit-btn'>Search</button>
      </form>

      {loading && <img src={Moose} alt="loading" className='loading'/>}
      {result && (
        <>
          <h2>Search Results:</h2>
         <div className='card-display'>
          
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
        </>
       
      )}
    </div>
  );
};
  
  export default RentalCarForm;