import moment from 'moment';
import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { createFlight } from '../api/Flight/Flight';
import AutoCompleteInput from './AutoComplete/AutoCompleteInput';
import Moose from '../assets/moose.svg';


function RoundTripSearchBar({ChangeRoute}) {

    let { amadeusToken } = useContext(AuthContext)
    let { user, authTokens } = useContext(AuthContext)
    let { itineraryID } = useParams()

    const [searchedFlights, setSearchedFlights] = useState(null)
    const [returnDate, setReturnDate] = useState(moment().add(1,'days').format('YYYY-MM-DD'))
    const [loading, setLoading] = useState(false)
    let flightOffers = []


    const handleDateChange = (event) => {
        setReturnDate(moment(event.target.value).add(1,'days').format('YYYY-MM-DD'));
      };



    useEffect(() => {

    }, [setReturnDate])

    useEffect(() => {
        setLoading(false)
    }, [searchedFlights])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
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
         "itinerary_id": itineraryID,
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
                        <p className="label" >Origin</p>
                        <AutoCompleteInput name="origin" placeholder="Where are you flying from?"/>
                        {/* <input type="text" name='origin' placeholder="Where do you want to go?" /> */}
                    </div>

                    <div className="search-input">
                        <p className="label" >Departure Date</p>
                        <input type="date" name="departureDate" placeholder="Check-in" min={moment().format('YYYY-MM-DD')} onChange={handleDateChange}/>
                    </div>

                    <div className="search-input">
                        <p className="label" >Destination</p>
                        <AutoCompleteInput name="destination" placeholder="Where do you want to go?"/>
                        {/* <input type="text" name='destination' placeholder="Where do you want to go?" /> */}
                    </div>

                    <div className="search-input">
                        <p className="label" >Return Date</p>
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
                        <button type="submit" className='submit-btn'>Search</button>
                    </div>

                </form>

            </div>
            {loading && <img src={Moose} alt="loading" className='loading'/>}
            {searchedFlights && searchedFlights.map((flight, index) => (
                <div key={index}>
                    <Card onClick={() => {
                        createFlight(authTokens.access, flightToSubmit(flight.origin, flight.destination, flight.price, flight.departureDate, flight.returnDate), itineraryID)
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

export default RoundTripSearchBar;