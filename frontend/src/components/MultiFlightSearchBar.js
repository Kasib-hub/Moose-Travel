import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { createFlight } from '../api/Flight/Flight';
import { Autocomplete } from "@react-google-maps/api"
import Alert from 'react-bootstrap/Alert';
import Moose from '../assets/moose.svg';



const MultiFlightSearchBar = ({ChangeRoute}) => {

    let { amadeusToken } = useContext(AuthContext)
    let { user, authTokens } = useContext(AuthContext)
    let { itineraryID } = useParams()

  const [returnedFlightList, setReturnedFlightList] = useState(null);
  const [flights, setFlights] = useState([
    { id: 1, from: "", to: "", departureDate: ""},
  ]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const options = {
    types:['airport']
  }

  // get the IATA code from the airport name then set the state
  const handleOriginSelection = (e, id) => {
    let regex = /\((.*?)\)/g
    let iataCodeWithParenthesis = e.target.value.match(regex)
    let iataCode = iataCodeWithParenthesis[0].replace(/\(|\)/g, "")
    handleFlightChange(id, e.target.name, iataCode)
  }

  useEffect(() => { 
    setLoading(false)
  }, [returnedFlightList]);

  function backendReadableConversion(segment) {
    
    if (!Array.isArray(segment)) {
        console.log("Error: segment is not an array.");
        return;
      }
    const convertedList = segment.map((originalSegment) => {
      const convertedSegment = {
        "departure_date": originalSegment.departure.at.substring(0,10),
        "itinerary_id": itineraryID,
        "user_id": user.user_id,
        "flight_type": "Multi-Flight",
        "departure": originalSegment.departure.iataCode,
        "destination": originalSegment.arrival.iataCode,
      };
      return convertedSegment;
    });

    convertedList.forEach((flightObject) => {
        createFlight(authTokens.access, flightObject, itineraryID);
      });

  }

  const convertFlights = (flights) =>
    flights.map((flight) => {
      if (flight.from.length !== 3 || flight.to.length !== 3) {
        setError("Please choose a valid city with airport that contains a 3 letter IATA code")
        flight.from = ''
        flight.to = ''
        return
      }
      if (new Date(flight.departureDate) < new Date()) {
        setError("Please choose a valid departure date in the future")
        flight.departureDate = ''
        return
      }

     return ({
        id: flight.id,
        originLocationCode: flight.from,
        destinationLocationCode: flight.to,
        departureDateTimeRange: { date: flight.departureDate },
      })
});

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
    setLoading(true)
    // Call findMultiFlight to send the API request
    findMultiFlight();
  };
  

  return (
    <div>
        <div className="search-div">
            <form onSubmit={handleSubmit}>

            {flights.map((flight) => (

                <div key={flight.id} className="search-form">
                      <div className="direct-flight">
                        <div className="search-input">
                          <label className="label">From:</label>
                          <Autocomplete options={options}>
                            <input
                              required 
                              type='text' 
                              name="from" 
                              value={flight.from}
                              onBlur={(event) => handleOriginSelection(event, flight.id)}
                              onChange={(event) =>
                              handleFlightChange(flight.id, "from", event.target.value)
                              } />
                          </Autocomplete>
                        </div>

                        <div className="search-input">
                          <label className="label">To:</label>
                          <Autocomplete options={options}>
                            <input
                              required 
                              type='text' 
                              name="to" 
                              value={flight.to} 
                              onBlur={(event) => handleOriginSelection(event, flight.id)}
                              onChange={(event) =>
                              handleFlightChange(flight.id, "to", event.target.value)
                              } />
                          </Autocomplete>
                        </div>

                        <div className="search-input">
                            <label className="label">Departure Date:</label>
                            <input
                              required
                              type="date"
                              value={flight.departureDate}
                              onChange={(event) =>
                              handleFlightChange(flight.id, "departureDate", event.target.value)
                              }
                            />
                        </div>
                    </div>
                        

                        <button type="button" onClick={() => handleDeleteFlight(flight.id)} className="other-btn">
                            Delete Flight
                        </button>
                        
                </div>
            ))}
            <button type="button" onClick={handleAddFlight} className="submit-btn">
                Add Flight
            </button>
            <button type="submit" className="submit-btn">Search</button>
            </form>
        </div>
        {loading && <img src={Moose} alt="loading" className='loading'/>}
        {returnedFlightList && returnedFlightList.map((flightGroup, index) => (
            <form key={index} onSubmit={(event) => {
                event.preventDefault();
                const segments = flightGroup.itineraries.flatMap(itinerary => itinerary.segments);
                const flightData = { segments };
                backendReadableConversion(flightData.segments);
                ChangeRoute()
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
