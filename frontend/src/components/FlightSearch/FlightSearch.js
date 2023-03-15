import React, { useState } from 'react';
import './FlightSearch.css';

const FlightSearch = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('ECONOMY');
  const [flightType, setFlightType] = useState('one-way');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    const queryParams = new URLSearchParams({
      origin,
      destination,
      departure_date: departureDate,
      adults,
      children,
      infants,
      travel_class: travelClass,
      return_date: flightType === 'round-trip' ? returnDate : undefined,
    });

    try {
      const response = await fetch(`/api/flight_search?${queryParams}`);
      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div className="flight-search">
      <h2>Flight Search</h2>
      <form onSubmit={handleSearch}>
        <label htmlFor="origin">Origin:</label>
        <input
          id="origin"
          type="text"
          value={origin}
          onChange={(event) => setOrigin(event.target.value)}
        />

        <label htmlFor="destination">Destination:</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />

        <label htmlFor="departure_date">Departure Date:</label>
        <input
          id="departure_date"
          type="date"
          value={departureDate}
          onChange={(event) => setDepartureDate(event.target.value)}
        />

        <label htmlFor="return_date">Return Date:</label>
        <input
          id="return_date"
          type="date"
          value={returnDate}
          onChange={(event) => setReturnDate(event.target.value)}
          disabled={flightType === 'one-way'}
        />

        <label htmlFor="adults">Adults:</label>
        <input
          id="adults"
          type="number"
          value={adults}
          onChange={(event) => setAdults(event.target.value)}
        />

        <label htmlFor="children">Children:</label>
        <input
          id="children"
          type="number"
          value={children}
          onChange={(event) => setChildren(event.target.value)}
        />

        <label htmlFor="infants">Infants:</label>
        <input
          id="infants"
          type="number"
          value={infants}
          onChange={(event) => setInfants(event.target.value)}
        />

        <label htmlFor="travel_class">Travel Class:</label>
        <select
          id="travel_class"
          value={travelClass}
          onChange={(event) => setTravelClass(event.target.value)}
        >
          <option value="ECONOMY">Economy</option>
          <option value="PREMIUM_ECONOMY">Premium Economy</option>
          <option value="BUSINESS">Business</option>
          <option value="FIRST">First Class</option>
        </select>

        <label htmlFor="flight_type">Flight Type:</label>
        <select
          id="flight_type"
          value={flightType}
          onChange={(event) => setFlightType(event.target.value)}
        >
          <option value="one-way">One-way</option>
          <option value="round-trip">Round-trip</option>
        </select>

        <button type="submit">Search Flights</button>
      </form>

      <div className="search-results">
        <h3>Search Results</h3>
        {searchResults.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <ul>
          {searchResults.map((result) => (
          <li key={`${result.origin}-${result.destination}-${result.departure_time}`}>
            {result.origin} &arr; {result.destination} | {result.departure_time} - {result.arrival_time} | {result.duration} | {result.price} {result.currency}
          </li>
        ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FlightSearch;

