import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// takes in properties of a itinerary from get request to the backend
function ItineraryCard ({itinerary_name, summary}) {

  return (
    <div>
      <h1>Your stuff Page</h1>
      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    </div>
    
  )

}

export default ItineraryCard