import moment from 'moment';
import { useState, useEffect } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router';


function RoundTripSearchBar() {

    const navigate = useNavigate();
    const [returnDate, setReturnDate] = useState(moment().add(1,'days').format('YYYY-MM-DD'))

    const handleDateChange = (event) => {
        setReturnDate(moment(event.target.value).add(1,'days').format('YYYY-MM-DD'));
      };

    useEffect(() => {

    }, [setReturnDate])

    return (
        <div class="search-div">
            <form className="search-form" onSubmit={() => navigate("/hotel-question")}>

                <div class="search-input">
                    <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Departure Location</p>
                    <input type="text" placeholder="Where do you want to go?" />
                </div>

                <div class="search-input">
                    <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Departure Date</p>
                    <input type="date" placeholder="Check-in" min={moment().format('YYYY-MM-DD')} onChange={handleDateChange}/>
                </div>

                <div class="search-input">
                    <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Arrival Location</p>
                    <input type="text" placeholder="Where do you want to go?" />
                </div>

                <div class="search-input">
                    <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Return Date</p>
                    <input type="date" placeholder="Check-out" min={returnDate}/>
                </div>

                <div class="search-input">
                    <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Guests</p>
                    <select>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    </select>
                </div>

                <div class="search-button">
                    <button type="submit">Search</button>
                </div>

            </form>

        </div>
    );
}

export default RoundTripSearchBar;