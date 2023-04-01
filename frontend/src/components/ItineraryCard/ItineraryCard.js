
import Card from 'react-bootstrap/Card';

// takes in properties of a itinerary from get request to the backend
function ItineraryCard ({itinerary_name, summary}) {

  return (
      <Card>
        <Card.Body>
          <Card.Title>{itinerary_name}</Card.Title>
          <Card.Text>
            {summary ? summary : "No Summary Created"}
          </Card.Text>
          <button className='submit-btn'>Details</button>
        </Card.Body>
      </Card>
    
  )

}

export default ItineraryCard