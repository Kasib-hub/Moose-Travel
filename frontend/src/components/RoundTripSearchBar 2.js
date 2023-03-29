import moment from 'moment';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';


function RoundTripSearchBar() {

    const API_KEY = "HSiSxHpuKA14AG9GKbQgC6cexT9mfaC9"
    const SECRET_KEY = "G9eTXhzEmSjKNTLu"
    const travel_token = "ZvHeGhGOz2EGG1V8U9NMkEUDGEWz"
    const navigate = useNavigate();
    const [returnDate, setReturnDate] = useState(moment().add(1,'days').format('YYYY-MM-DD'))



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
      
        const apiKey = travel_token;
      
        const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=${guests}&max=15`, {
          headers: {
            Authorization: `Bearer ${travel_token}`,
          },
        });

        const data = await response.json();
        console.log(data);
    }


    return (
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
    );
}

export default RoundTripSearchBar;