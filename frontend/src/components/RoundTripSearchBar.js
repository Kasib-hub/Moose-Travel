import moment from 'moment';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { createFlight } from '../api/Flight/Flight';


function RoundTripSearchBar() {

    let { amadeusToken } = useContext(AuthContext)
    let { user, authTokens } = useContext(AuthContext)

    const [searchedFlights, setSearchedFlights] = useState(null)
    const [returnDate, setReturnDate] = useState(moment().add(1,'days').format('YYYY-MM-DD'))
    let flightOffers = []


    const handleDateChange = (event) => {
        setReturnDate(moment(event.target.value).add(1,'days').format('YYYY-MM-DD'));
      };



    useEffect(() => {

    }, [setReturnDate])



    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const origin = e.target.elements.origin.value;
        const destination = e.target.elements.destination.value;
        const departureDate = e.target.elements.departureDate.value;
        const returnDate = e.target.elements.returnDate.value;
        const guests = e.target.elements.guests.value;

        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${guests}&max=15`, {
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
                departureDate: departureDate,
                returnDate: returnDate,
          }))
          setSearchedFlights(flightOffers)
        })
    }

    const flightToSubmit = (origin, destination, price, departureDate, returnDate) => {
        let flightData =  {
         "departure_date": departureDate,
         "itinerary_id": 1,
         "user_id": user.user_id,
         "flight_type": "Direct",
         "departure": origin,
         "destination": destination,
         "price" : price,
         "return_date": returnDate,
         }
 
         return flightData;
     }

    return (
        <div>
            <div className="search-div">
                <form className="search-form" onSubmit={handleSubmit}>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Origin</p>
                        <input type="text" name='origin' placeholder="Where do you want to go?" />
                    </div>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Departure Date</p>
                        <input type="date" name="departureDate" placeholder="Check-in" min={moment().format('YYYY-MM-DD')} onChange={handleDateChange}/>
                    </div>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Destination</p>
                        <input type="text" name='destination' placeholder="Where do you want to go?" />
                    </div>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Return Date</p>
                        <input type="date" name="returnDate" placeholder="Check-out" min={returnDate}/>
                    </div>

                    <div className="search-input">
                        <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Guests</p>
                        <select name='guests'>
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
                    <Card key={index} onClick={() => createFlight(authTokens.access, flightToSubmit(flight.origin, flight.destination, flight.price, flight.departureDate, flight.returnDate), 1)}>
                        <div>Origin: {flight.origin}</div>
                        <div>Destination: {flight.destination}</div>
                        <div>Price: {flight.price}</div>
                    </Card>
                </div>
                ))}

        </div>
    );
}

export default RoundTripSearchBar;