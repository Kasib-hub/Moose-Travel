import moment from 'moment';
import { useState } from 'react';
import Moment from 'react-moment';
import { CSSTransition } from "react-transition-group";

function DirectFlightSearchBar({ onSubmit }) {

    const handleSubmit = () => {
        // Handle form submission here
        // When done, move to the next component
        // e.g. using React Router: history.push("/component2");
        onSubmit();
      };

    return (
        <div class="search-div">
            <CSSTransition classNames="fade" timeout={500}>
                <form className="search-form" onSubmit={handleSubmit}>
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

            </CSSTransition>

        </div>
    );
}

export default DirectFlightSearchBar;