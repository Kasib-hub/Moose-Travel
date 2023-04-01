import { getItineraryByID } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FlightSearchSelection from '../components/FlightSearchSelection';


function ChooseFlight({selections}) {

  let { authTokens } = useContext(AuthContext)
  let {itineraryID} = useParams()

  const [itineraryName, setItineraryName] = useState()

  useEffect(() => {
    const itinerary = async (itineraryID) => {
      const grabbedItinerary = await getItineraryByID(authTokens.access, itineraryID)
      console.log(setItineraryName(grabbedItinerary.itinerary_name))
    }
    itinerary(itineraryID)

  }, [authTokens.access, itineraryID])

  return (
    <div>
      <p>I passed {selections} which are the remaining picks from your choices</p>
      <h1>Choose a flight for {itineraryName}</h1>
      <FlightSearchSelection />
    </div>
  );
}

export default ChooseFlight;