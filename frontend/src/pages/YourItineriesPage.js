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
      {userItineraries && console.log(userItineraries)}
      <h1>Your stuff Page</h1>
      {/* {
        userItineraries && userItineraries.map((itinerary, idx) => {
          <ItineraryCard />
        })
      } */}
    </div>
    
  )

}

export default YourItinerariesPage