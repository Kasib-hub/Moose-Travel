import { createItinerary } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';


function HomePage() {

  let {user, authTokens} = useContext(AuthContext)

  const handleClick = async () => {
    const postedItinerary = await createItinerary(authTokens.access)
  }

  const postItinerary = async () => {
    const postedItinerary = await createItinerary(authTokens.access, itineraryObject.itinerary)
    console.log(postedItinerary)
  }

  return (
    <div>
      <h1>Welcome to Moose Travel</h1>
      <h2>You're Best Travel Partner</h2>
      <form>
        <input />
        <button></button>
      </form>
    </div>
  );
}

export default HomePage;
