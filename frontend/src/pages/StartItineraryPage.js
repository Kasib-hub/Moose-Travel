import Form from 'react-bootstrap/Form';
import { createItinerary } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


function StartItineraryPage() {

  // let {user, logoutUser, authTokens} = useContext(AuthContext)

  let {user, authTokens} = useContext(AuthContext)

  const navigate = useNavigate()

  // This form POSTS the itinerary and uses the response to create the route for the next page that requires the itinerary ID
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "itinerary_name": e.target.name.value,
      "user_id": user.user_id
    }
    const postedItinerary = await createItinerary(authTokens.access, data)
    postedItinerary && navigate(`/itinerary/${postedItinerary.id}/trip-selection`)
  }


  return (
    <div>
      <h1>Welcome to Moose Travel</h1>
      <h2>"You're Best Travel Partner"</h2>
      <Form onSubmit={handleSubmit} className="boot-form">
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name your Trip!</Form.Label>
          <Form.Control type="text" placeholder="Enter a Name" required/>
        </Form.Group>
        <button className='submit-btn' type='submit'>Create Itinerary</button>
      </Form>
    </div>
  );
}

export default StartItineraryPage;
