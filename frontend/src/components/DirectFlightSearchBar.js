import moment from 'moment';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { createFlight } from '../api/Flight/Flight';
import AutoCompleteInput from './AutoComplete/AutoCompleteInput';
import Moose from '../assets/moose.svg';



function DirectFlightSearchBar({ChangeRoute}) {

    let { amadeusToken } = useContext(AuthContext)
    let { user, authTokens } = useContext(AuthContext)
    let {itineraryID} = useParams()
    //authTokens.access to be passed into create flight

    const [searchedFlights, setSearchedFlights] = useState(null)
    const [loading, setLoading] = useState(false)
    let flightOffers = []

    useEffect(() => { }, [searchedFlights]);


    useEffect(() => { 
        setLoading(false)
    }, [searchedFlights]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const origin = e.target.elements.origin.value;
        const destination = e.target.elements.destination.value;
        const departureDate = e.target.elements.departureDate.value;
        const guests = e.target.elements.guests.value;
      
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${guests}&max=15`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${amadeusToken}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            flightOffers= data["data"]
            console.log("Data:")
            console.log(flightOffers)
            flightOffers = flightOffers.map((flight) => ({
                origin: origin,
                destination: destination,
                price: flight["price"]["grandTotal"],
                departureDate: departureDate,
          }))
          setSearchedFlights(flightOffers)
        })
    }

    const flightToSubmit = (origin, destination, price, departureDate) => {
       let flightData =  {
        "departure_date": departureDate,
        "itinerary_id": itineraryID,
        "user_id": user.user_id,
        "flight_type": "Direct",
        "departure": origin,
        "destination": destination,
        "price" : price,
        }

        return flightData;
    }

    return (
        <div>
        <div className="search-div">

                <form className="search-form" onSubmit={handleSubmit}>
                    <div className="search-input">
                        <label className='label'>Origin</label>
                        <AutoCompleteInput name="origin" placeholder="Where are you flying from?"/>
                    </div>
                    <div className="search-input">
                        <label className='label'>Destination</label>
                        <AutoCompleteInput name="destination" placeholder="Where do you want to go?"/>
                    </div>
                    <div className="search-input">
                        <label className='label'>Departure Date</label>
                        <input type="date" name="departureDate" placeholder="Check-in" min={moment().format('YYYY-MM-DD')} />
                    </div>

                    <div className="search-input">
                        <label className='label'>Guests</label>
                        <select name="guests">
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                        </select>
                    </div>

                    <div className="search-button">
                        <button className='submit-btn' type="submit">Search</button>
                    </div>

                </form>
            </div>
            {loading && <img src={Moose} alt="loading" className='loading'/>}
            {searchedFlights && searchedFlights.map((flight, index) => (
                <div key={index}>
                    <Card onClick={() => {
                        createFlight(authTokens.access, flightToSubmit(flight.origin, flight.destination, flight.price, flight.departureDate), itineraryID)
                        ChangeRoute()
                        }}>
                        <div>Origin: {flight.origin}</div>
                        <div>Destination: {flight.destination}</div>
                        <div>Price: {flight.price}</div>
                    </Card>
                </div>
                ))}
        </div>
    );
}

export default DirectFlightSearchBar;