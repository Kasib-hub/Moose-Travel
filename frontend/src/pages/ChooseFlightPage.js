
import { useParams, useNavigate } from 'react-router-dom';
import FlightSearchSelection from '../components/FlightSearchSelection';
import Map from "../assets/Map.svg";


function ChooseFlightPage({selections, setSelections}) {

  let {itineraryID} = useParams()
  let navigate = useNavigate()

  // checking to see if I can get the itinerary object, might be better to handle this in app.js


  const ChangeRoute = () => {
    if (selections.length < 1) {
      return navigate(`/itinerary/${itineraryID}/choose-genre`)
    }
    console.log(selections)
    let route = selections[0]
    setSelections(selections.slice(1))
    navigate(route)
  }

  return (
    <div>
      <h1>Let's find you some flights  <img src={Map} alt="Map wire"/></h1>
      <FlightSearchSelection ChangeRoute={ChangeRoute}/>
    </div>
  );
}

export default ChooseFlightPage;