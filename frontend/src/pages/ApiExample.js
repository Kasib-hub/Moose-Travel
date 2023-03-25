
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { createItinerary, getItineraryByID, editItinerary} from '../api/Itinerary/Itinerary';

// dummy homepage - we'll have these in a navBar
function ApiExample() {

  let {user, authTokens} = useContext(AuthContext)

  const itineraryObject = {
    "itinerary": {
      "itinerary_name": "This is no Moose",
      "user_id": 4,
    },
  
    "flight":[ 
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "flight_type": "Round-trip",
        "departure": "Hawaii",
        "destination": "Japan",
        "arrival_date": "2022-08-31",
        "departure_date": "2022-11-30"
      },
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "flight_type": "Round-trip",
        "departure": "Japan",
        "destination": "Hawaii",
        "arrival_date": "2022-08-31",
        "departure_date": "2022-11-30"
      },
    ],
  
    "hotel": [
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "hotel_name": "Holiday",
        "location": "Japan",
        "check_in_date": "2022-08-31",
        "check_out_date": "2022-11-30"
      },
    ],
  
    "rental": [
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "rental_company": "Budget",
        "pick_up_location": "Franfurt",
        "return_location": "America",
        "pick_up_date": "2022-09-30",
        "return_date": "2022-11-30"
      },
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "rental_company": "Alamo",
        "pick_up_location": "Franfurt",
        "return_location": "Paris",
        "pick_up_date": "2022-09-30",
        "return_date": "2022-11-30"
      },
    ],
  
    "affinity": [
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "affinity_type": "Budgets"
      },
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "affinity_type": "Food"
      },
    ],
  
    "sight": [
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "sight_name": "Eiffel Tower"
      },
      {
        "itinerary_id": 1,
        "user_id": user.user_id,
        "sight_name": "Louvre"
      },
    ]
  }

  // POST to make itinerary
  const postItinerary = async () => {
    const postedItinerary = await createItinerary(itineraryObject.itinerary, authTokens.access)
    console.log(postedItinerary)
  }

  // Get by ID itinerary
  const fetchItinerary = async () => {
    const fetchedItinerary = await getItineraryByID(authTokens.access, 2)
    console.log(fetchedItinerary)
  }

  // Edit Itinerary
  const putItinerary = async () => {
    const data = {
      "itinerary_name": "you got editted from react fool",
      "user_id": user.user_id
    }
    const fixedItinerary = await editItinerary(authTokens.access, data, 1)
    console.log(fixedItinerary)
  }
 

  return (
    <>
      <button onClick={postItinerary}>post an itinerary</button>
      <button onClick={fetchItinerary}>fetch an itinerary</button>
      <button onClick={putItinerary}>put an itinerary</button>
      <p>Api-Example</p>
    </>
  );
}

export default ApiExample;