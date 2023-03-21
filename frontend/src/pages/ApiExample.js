
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';

// dummy homepage - we'll have these in a navBar
function ApiExample() {

  let {user, authTokens} = useContext(AuthContext)

  const [errors, setErrors] = useState()

  const itineraryObject = {
    "itinerary": {
      "itinerary_name": "moose from the frontend!",
      "user_id": user.user_id,
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
    ],



  }

  
  
  // const signUpUser = async (userObj) => {
  //   const BASE_URL = process.env.REACT_APP_BASE_URL
  //   const url = `http://${BASE_URL}/api/signup/`
  //   const context = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(userObj)
  //   }
  //   const resp = await fetch(url, context)
  //   const body = await resp.json()
  //   if (resp.status === 400) {
  //     setErrors(body)
  //   } else {
  //     alert('Signed Up Successfully!')
  //     navigate("/")
  //   }
  // }

  return (
    <>
      <p>Api-Example</p>
    </>
  );
}

export default ApiExample;
