import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createItinerary } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {

  let {user, authTokens} = useContext(AuthContext)

  let [itineraryRes, setItineraryRes] = useState()
  const navigate = useNavigate()

  // This form POSTS the itinerary
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "itinerary_name": e.target.name.value,
      "user_id": user.user_id
    }
    const postedItinerary = await createItinerary(authTokens.access, data)
    postedItinerary && navigate(`/itinerary/${postedItinerary.id}/trip-selection`)
    // route to the created page
  }

  // const postItinerary = async () => {
  //   const postedItinerary = await createItinerary(authTokens.access)
  //   console.log(postedItinerary)
  // }

  return (
    <div>
      <h1>Welcome to Moose Travel</h1>
      <h2>You're Best Travel Partner</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name your Trip!</Form.Label>
          <Form.Control type="text" placeholder="Enter a Name" required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Itinerary
        </Button>
      </Form>
    </div>
  );
}

export default HomePage;
