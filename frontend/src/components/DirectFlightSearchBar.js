import moment from 'moment';
import { useState, useEffect, useContext } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';
import Card from 'react-bootstrap/Card';
import AuthContext from '../context/AuthContext';

function DirectFlightSearchBar() {
    let {amadeusToken} = useContext(AuthContext)
    const navigate = useNavigate();
    const [searchedFlights, setSearchedFlights] = useState(null)
    let flightOffers = []

    const travel_token = "6KXp6oaqI0gvTGmUk50v3a9KLdGX"

    useEffect(() => { }, [searchedFlights]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const origin = e.target.elements.origin.value;
        const destination = e.target.elements.destination.value;
        const departureDate = e.target.elements.departureDate.value;
        const guests = e.target.elements.guests.value;
      
        const apiKey = travel_token;
      
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${guests}&max=15`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${amadeusToken}`,
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
          }))
          setSearchedFlights(flightOffers)
        })
    }

    //navigate("/hotel-question")

    return (
        <div>
        <div className="search-div">

                <form className="search-form" onSubmit={handleSubmit}>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Origin</p>
                        <input type="text" name="origin" placeholder="Where do you want to go?" />
                    </div>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Destination</p>
                        <input type="text" name="destination" placeholder="Where do you want to go?" />
                    </div>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Departure Date</p>
                        <input type="date" name="departureDate" placeholder="Check-in" min={moment().format('YYYY-MM-DD')} />
                    </div>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Guests</p>
                        <select name="guests">
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        </select>
                    </div>

                    <div className="search-button">
                        <button type="submit">Search</button>
                    </div>

                </form>
            </div>
            {searchedFlights && searchedFlights.map((flight, index) => (
                <div>
                    <Card key={index}>
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