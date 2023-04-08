import ItineraryCard from '../components/ItineraryCard/ItineraryCard';
import { getItinerariesbyUser } from '../api/Itinerary/Itinerary';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

function YourItinerariesPage () {

  let {user, authTokens} = useContext(AuthContext)

  const [userItineraries, setUserItineraries] = useState()

  useEffect(() => {
    const fetchItinerary = async () => {
     const fetchedItinerary = await getItinerariesbyUser(authTokens.access, user.user_id)
     setUserItineraries(fetchedItinerary)
    }
    fetchItinerary()
 }, [authTokens.access, user.user_id])

  return (
    <div>
      <h1>Your Itineraries</h1>
      {
        userItineraries && userItineraries.map((itinerary) => {
          return (
            <ItineraryCard key={itinerary.id} id={itinerary.id} itinerary_name={itinerary.itinerary_name} summary={itinerary.summary}/>
          )
        })
      }
    </div>
    
  )

}

export default YourItinerariesPage