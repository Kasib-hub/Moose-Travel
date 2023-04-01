import { useNavigate, useParams } from 'react-router-dom';
import Airplane from '../../assets/airplane.svg'
import Car from '../../assets/car.svg'
import Hotel from '../../assets/hotel.svg'
import Restaurant from '../../assets/restaurant.svg'
import Sight from '../../assets/sight.svg'
import './TripSelector.css'

function TripSelector({selections, setSelections}) {

  let {itineraryID} = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    // destructuring the value and checked properies of the form of checkboxes
    const {value, checked} = e.target
    checked 
    ? setSelections([...selections, value])
    : setSelections(selections.filter(element => element !== value)) // filtering out unchecked boxes
  }

  // choose the first element, cleave it, go to next page(route)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selections.length === 1) navigate()
    console.log(selections)
    let route = selections[0]
    setSelections(selections.slice(1))
    navigate(route)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='trip-selector-form'>
        <div className='trip-checkbox'>
          <button className='trip-btn'><img src={Airplane} alt="Trash Icon" /></button>
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-flight`}/>
            <label>Airplane</label>     
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Hotel} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-hotel`}/>
            <label>Hotel</label> 
          </div>
        </div>

        <div className='trip-checkbox'>
          
          <img src={Car} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-car`}/>
            <label>Rental Car</label>
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Restaurant} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-restaurant`}/>
            <label>Restaurants</label>
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Sight} alt="Trash Icon" />
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-activity`}/>
            <label>Activites</label>
          </div>
        </div>
      </div>
      <button className='submit-btn' type='submit'>Start</button>
    </form>
  );
}

export default TripSelector;

