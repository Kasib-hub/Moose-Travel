import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getItineraryByID } from "../../api/Itinerary/Itinerary";
import AuthContext from '../../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Airplane from '../../assets/airplane.svg'
import Car from '../../assets/car.svg'
import Hotel from '../../assets/hotel.svg'
import Restaurant from '../../assets/restaurant.svg'
import Sight from '../../assets/sight.svg'
import './TripSelector.css'

function TripSelector() {

  let {user, authTokens} = useContext(AuthContext)
  let {itineraryID} = useParams()
  const navigate = useNavigate()

  const [selections, setSelections] = useState({})

  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target.value)
  }

  return (
    <form>
      <div className='trip-selector-form'>
        <div className='trip-checkbox'>
          <button className='trip-btn'><img src={Airplane} alt="Trash Icon" /></button>
          <div className='labels'>
            <input type="checkbox"/>
            <label>Airplane</label>     
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Hotel} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox"/>
            <label>Hotel</label> 
          </div>
        </div>

        <div className='trip-checkbox'>
          
          <img src={Car} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox"/>
            <label>Rental Car</label>
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Restaurant} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox"/>
            <label>Restaurants</label>
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Sight} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox"/>
            <label>Activites</label>
          </div>
        </div>
      </div>
      <button className='submit-btn' type='submit'>Start</button>
    </form>
  );
}

export default TripSelector;

