import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { createFlight } from '../api/Flight/Flight';


const MultiFlightSearchBar = () => {

    let { amadeusToken } = useContext(AuthContext)
    let { user, authTokens } = useContext(AuthContext)

  const [returnedFlightList, setReturnedFlightList] = useState(null);
  const navigate = useNavigate();
  const [flights, setFlights] = useState([
    { id: 1, from: "", to: "", departureDate: ""},
  ]);

  useEffect(() => { 
  }, []);

  function backendReadableConversion(segment) {
    if (!Array.isArray(segment)) {
        console.log("Error: segment is not an array.");
        return;
      }
    const convertedList = segment.map((originalSegment) => {
      const convertedSegment = {
        "departure_date": originalSegment.departure.at.substring(0,10),
        "itinerary_id": 1,
        "user_id": user.user_id,
        "flight_type": "Multi-Flight",
        "departure": originalSegment.departure.iataCode,
        "destination": originalSegment.arrival.iataCode,
      };
      return convertedSegment;
    });

    convertedList.forEach((flightObject) => {
        createFlight(authTokens.access, flightObject, 2);
      });

  }

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
    const updatedFlights = [...flights];
    const index = updatedFlights.findIndex((flight) => flight.id === id);
    updatedFlights[index][field] = value;
    setFlights(updatedFlights);
  };


   // Make an API request using the newFlights data
    //multi-trip search (The API lets you search for up to six origin and destination city pairs)
    const findMultiFlight = async() => {
        const newFlights = convertFlights(flights);
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers `, {
            method: `POST`,
            headers: {
                'Authorization': `Bearer ${amadeusToken}`,
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
            setReturnedFlightList(data["data"]);
          })
        .catch(error => console.error(error));
    }  

    


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Call findMultiFlight to send the API request
    findMultiFlight();
  };
  

  return (
    <div>
        <div className="search-div">
            <form onSubmit={handleSubmit}>

            {flights.map((flight) => (

                <div key={flight.id} className="search-form">
    
                        <div className="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>From:</label>
                            <input
                                type="text"
                                value={flight.from}
                                onChange={(event) =>
                                handleFlightChange(flight.id, "from", event.target.value)
                                }
                            />
                        </div>

                        <div className="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>To:</label>
                            <input
                                type="text"
                                value={flight.to}
                                onChange={(event) =>
                                handleFlightChange(flight.id, "to", event.target.value)
                                }
                            />
                        </div>

                        <div className="search-input">
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
        {returnedFlightList && returnedFlightList.map((flightGroup, index) => (
            <form key={index} onSubmit={(event) => {
                event.preventDefault();
                const segments = flightGroup.itineraries.flatMap(itinerary => itinerary.segments);
                const flightData = { segments };
                backendReadableConversion(flightData.segments);
            }}>
                <div>
                <h3><b>Price:</b> {flightGroup["price"]["grandTotal"]}</h3>
                {flightGroup.itineraries.map((itinerary, index) => (
                    <div key={index}>
                    <h3><u>Trip {index + 1}</u></h3>
                    {itinerary.segments.map((segment, index) => (
                        <div key={index}>
                        <h5>Flight {index+1}</h5>
                        <p>Departure - {segment.departure.iataCode} {segment.departure.at}</p>
                        <p>Arrival - {segment.arrival.iataCode} {segment.arrival.at}</p>
                        </div>
                    ))} 
                    </div>
                ))}
                </div>
                <button type="submit">Save Flight</button>
            </form>
            ))}
    </div>
  );
};

export default MultiFlightSearchBar;
