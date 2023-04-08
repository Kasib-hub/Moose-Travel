import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import Button from "react-bootstrap/esm/Button";
import { deleteItinerary } from "../api/Itinerary/Itinerary";
import "./DeleteTripSummaryPage.css";

function DeleteTripSummaryPage() {
  let { itineraryID } = useParams();
  let {authTokens, user} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleClick = () => {
    removeItinerary()
    setTimeout(() => {
      navigate(`/itinerary/${user.user_id}/your-itineraries`);
    }, 1000);
  };


  const removeItinerary = async () => {
    const fetchedItinerary = await deleteItinerary(authTokens.access, itineraryID)
  }
  

  return (
    <div>
      <h1>Delete Trip</h1>
      <p>Are you sure you want to delete?</p>
      <div className="delete-choices">
        <Button variant="danger" onClick={handleClick} className="other-btn">Yes, Delete</Button>
        <Link to={`/itinerary/${user.user_id}/your-itineraries`}><button className='detail-btn'>No, Go back</button></Link>
      </div>
    </div>
  );
}

export default DeleteTripSummaryPage;