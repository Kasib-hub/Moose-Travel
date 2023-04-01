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
      <div className='trip-checkbox'>
        <label>Airplane</label>
        <button className='trip-btn'><img src={Airplane} alt="Trash Icon" /></button>
        <input type="checkbox"/>
      </div>
      <div className='trip-checkbox'>
        <label>Airplane</label>
        <img src={Hotel} alt="Trash Icon" />
        <input type="checkbox"/>
      </div>
      <div className='trip-checkbox'>
        <label>Airplane</label>
        <img src={Airplane} alt="Trash Icon" />
        <input type="checkbox"/>
      </div>
      <div className='trip-checkbox'>
        <label>Airplane</label>
        <img src={Airplane} alt="Trash Icon" />
        <input type="checkbox"/>
      </div>
      <div className='trip-checkbox'>
        <label>Airplane</label>
        <img src={Airplane} alt="Trash Icon" />
        <input type="checkbox"/>
      </div>

    </form>
  );
}

export default TripSelector;

