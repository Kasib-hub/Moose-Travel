import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Airplane from '../../assets/airplane.svg'
import Car from '../../assets/car.svg'
import Hotel from '../../assets/hotel.svg'
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

  useEffect(() => {
    setSelections([])
  }, [setSelections])

  // choose the first element, cleave it, go to next page(route)
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(selections)
    let route = selections[0]
    setSelections(selections.slice(1))
    navigate(route)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='trip-selector-form'>
        <div className='trip-checkbox'>
          <img src={Airplane} alt="Airplane Icon" />
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-flight`}/>
            <label>Airplane</label>     
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Hotel} alt="Hotel Icon" />
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-hotel`}/>
            <label>Hotel</label> 
          </div>
        </div>

        <div className='trip-checkbox'>
          
          <img src={Car} alt="Car Icon" />
          <div className='labels'>
            <input type="checkbox" name='trip-selections' onChange={handleChange} value={`/itinerary/${itineraryID}/choose-car`}/>
            <label>Rental Car</label>
          </div>
        </div>

        <div className='trip-checkbox'>
          <img src={Sight} alt="Sight Icon"/>
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

