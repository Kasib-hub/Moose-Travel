import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

// takes in properties of a itinerary from get request to the backend
function ItineraryCard ({id, itinerary_name, summary}) {

  return (
      <Card>
        <Card.Body>
          <Card.Title>{itinerary_name}</Card.Title>
          <Card.Text>
            {summary ? `${summary.slice(0, 100)}...` : "No Summary Created"}
          </Card.Text>
          {/* navigate to a detail page of the summary */}
          <Link to={`/itinerary/${id}/trip-summary`}><button className='submit-btn'>Details</button></Link>
        </Card.Body>
      </Card>
    
  )

}

export default ItineraryCard