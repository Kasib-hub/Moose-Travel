import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getItineraryByID } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FlightSearchSelection from '../components/FlightSearchSelection';
import TripSelector from '../components/TripSelector/TripSelector';


function TripSelection() {

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
      <h1>Customize your trip: Name - {itineraryName}</h1>
      <TripSelector />
    </div>
  );
}

export default TripSelection;