import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createItinerary } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';


function HomePage() {

  let {user, authTokens} = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "itinerary_name": e.target.name.value,
      "user_id": user.user_id
    }
    const postedItinerary = await createItinerary(authTokens.access, data)
    // route to the created page
  }

  const postItinerary = async () => {
    const postedItinerary = await createItinerary(authTokens.access)
    console.log(postedItinerary)
  }

  return (
    <div>
      <h1>Welcome to Moose Travel</h1>
      <h2>You're Best Travel Partner</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name your Itinerary</Form.Label>
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
