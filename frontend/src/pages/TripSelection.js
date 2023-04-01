import { getItineraryByID } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TripSelector from '../components/TripSelector/TripSelector';


function TripSelection({selections, setSelections}) {

  let {authTokens} = useContext(AuthContext)
  let {itineraryID} = useParams()

  const [itineraryName, setItineraryName] = useState()

  useEffect(() => {
    const itinerary = async (itineraryID) => {
      const grabbedItinerary = await getItineraryByID(authTokens.access, itineraryID)
      setItineraryName(grabbedItinerary.itinerary_name)
    }
    itinerary(itineraryID)

  }, [authTokens.access, itineraryID])

  return (
    <div>
      <h1>Customize your trip: Name - {itineraryName}</h1>
      <TripSelector selections={selections} setSelections={setSelections}/>
    </div>
  );
}

export default TripSelection;