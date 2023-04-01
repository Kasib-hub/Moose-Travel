import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getItineraryByID } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FlightSearchSelection from '../components/FlightSearchSelection';


function ChooseFlight({selections}) {

  let {user, authTokens} = useContext(AuthContext)
  let {itineraryID} = useParams()
  const navigate = useNavigate()

  const [itineraryName, setItineraryName] = useState()

  useEffect(() => {
    const itinerary = async (itineraryID) => {
      const grabbedItinerary = await getItineraryByID(authTokens.access, itineraryID)
      console.log(setItineraryName(grabbedItinerary.itinerary_name))
    }
    itinerary(itineraryID)

  }, [])

  return (
    <div>
      <p>I passed {selections} which are the remaining picks from your choices</p>
      <h1>Choose a flight for {itineraryName}</h1>
      <FlightSearchSelection />
    </div>
  );
}

export default ChooseFlight;