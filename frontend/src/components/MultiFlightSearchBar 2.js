import React, { useState } from "react";
import { useNavigate } from 'react-router';


const MultiFlightSearchBar = () => {

  const API_KEY = "HSiSxHpuKA14AG9GKbQgC6cexT9mfaC9"
  const SECRET_KEY = "G9eTXhzEmSjKNTLu"
  const travel_token = "ZvHeGhGOz2EGG1V8U9NMkEUDGEWz"  

  const navigate = useNavigate();

  const [flights, setFlights] = useState([
    { id: 1, from: "", to: "", departureDate: ""},
  ]);
  const [newFlights, setNewFlights] = useState([]);

  const convertFlights = (flights) =>
    flights.map((flight) => ({
        id: flight.id,
        originLocationCode: flight.from,
        destinationLocationCode: flight.to,
        departureDateTimeRange: { date: flight.departureDate },
  }));

  const handleAddFlight = () => {
    const newId = flights[flights.length - 1].id + 1;
    setFlights([
      ...flights,
      { id: newId, from: "", to: "", departureDate: ""},
    ]);
  };

  const handleDeleteFlight = (id) => {
    const filteredFlights = flights.filter((flight) => flight.id !== id);
    setFlights(filteredFlights);
  };

  const handleFlightChange = (id, field, value) => {
    console.log(value)
    const updatedFlights = [...flights];
    const index = updatedFlights.findIndex((flight) => flight.id === id);
    updatedFlights[index][field] = value;
    setFlights(updatedFlights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Make an API request using the newFlights data
    //multi-trip search (The API lets you search for up to six origin and destination city pairs)
    const findMultiFlight = async() => {
      const newFlights = convertFlights(flights);
      console.log("newFlights")
      console.log(newFlights)
      fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers `, {
          method: `POST`,
          headers: {
              'Authorization': `Bearer ${travel_token}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              "originDestinations": newFlights,
              "travelers": [
                  {
                      "id": "1",
                      "travelerType": "ADULT",
                      "fareOptions": [
                          "STANDARD"
                      ]
                  }
              ],
              "sources": [
                  "GDS"
              ],
              "searchCriteria": {
                  "maxFlightOffers": 10
              }
          })
          
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
        })
      .catch(error => console.error(error));
    }  
  
    // Call findMultiFlight to send the API request
    findMultiFlight();
  };
  
  console.log("Flights:")
  console.log(flights)

  return (
    <div class="search-div">
        <form onSubmit={handleSubmit}>

        {flights.map((flight) => (

            <div key={flight.id} className="search-form">
 
                    <div class="search-input">
                        <label style={{color: 'white', fontSize: '1.3rem'}}>From:</label>
                        <input
                            type="text"
                            value={flight.from}
                            onChange={(event) =>
                            handleFlightChange(flight.id, "from", event.target.value)
                            }
                        />
                    </div>

                    <div class="search-input">
                        <label style={{color: 'white', fontSize: '1.3rem'}}>To:</label>
                        <input
                            type="text"
                            value={flight.to}
                            onChange={(event) =>
                            handleFlightChange(flight.id, "to", event.target.value)
                            }
                        />
                    </div>

                    <div class="search-input">
                        <label style={{color: 'white', fontSize: '1.3rem'}}>Departure Date:</label>
                        <input
                            type="date"
                            value={flight.departureDate}
                            onChange={(event) =>
                            handleFlightChange(flight.id, "departureDate", event.target.value)
                            }
                        />
                    </div>

                    <button type="button" onClick={() => handleDeleteFlight(flight.id)} className="deleteButton">
                        Delete Flight
                    </button>
                    
            </div>
        ))}
        <button type="button" onClick={handleAddFlight} className="add-search">
            Add Flight
        </button>
        <button type="submit" className="hotel-search">Search</button>
        </form>
    </div>
  );
};

export default MultiFlightSearchBar;