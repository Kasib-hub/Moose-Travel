import { getItineraryByID } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FlightSearchSelection from '../components/FlightSearchSelection';


function ChooseFlightPage({selections}) {

  let { authTokens } = useContext(AuthContext)
  let {itineraryID} = useParams()

  const [itineraryName, setItineraryName] = useState()

  // checking to see if I can get the itinerary object, might be better to handle this in app.js
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
      {/* once the form is finished, allow user to go to next page somehow */}
      {/* probably needs to be handled from within the component so I'll provide the tripObj */}
      <FlightSearchSelection />
      
    </div>
  );
}

export default ChooseFlightPage;