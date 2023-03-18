import moment from 'moment';
import { useState } from 'react';
import Moment from 'react-moment';

function DirectFlightSearch() {

    return (
        <div class="search-form">
            <form>

                <div class="search-input">
                    <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Location</p>
                    <input type="text" placeholder="Where do you want to go?" />
                </div>

                <div class="search-input">
                    <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Departure Date</p>
                    <input type="date" placeholder="Check-in" min={moment().format('YYYY-MM-DD')} />
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

export default DirectFlightSearch;