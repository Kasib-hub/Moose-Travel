import ItineraryCard from '../components/ItineraryCard/ItineraryCard';
import { getItinerariesbyUser } from '../api/Itinerary/Itinerary';
import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

function YourItinerariesPage () {

  let {user, authTokens} = useContext(AuthContext)

  const [userItineraries, setUserItineraries] = useState()

  // make call to get all itineraries for the user
  useEffect(() => {
    fetchItineraries()
  }, [])

  const fetchItineraries = async () => {
    const fetchedItineraries = await getItinerariesbyUser(authTokens.access, user.user_id)
    setUserItineraries(fetchedItineraries)
  }

  return (
    <div>
      <h1>Your stuff Page</h1>
      {
        userItineraries && userItineraries.map((itinerary, idx) => {
          return (
            <ItineraryCard key={idx} itinerary_name={itinerary.itinerary_name} summary={itinerary.summary}/>
          )
        })
      }
    </div>
    
  )

}

export default YourItinerariesPage