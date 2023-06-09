import "./GenreSelector.css"
import { useParams } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { createAffinity } from "../../api/Affinity/Affinity"

function GenreSelector ({likes, setLikes}) {

  let { user, authTokens } = useContext(AuthContext);
  let { itineraryID } = useParams();

  const handleChange = (e) => {
    // destructuring the value and checked properies of the form of checkboxes
    const {value, checked} = e.target
    checked 
    ? setLikes([...likes, value])
    : setLikes(likes.filter(element => element !== value)) // filtering out unchecked boxes


  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(likes)
    
    likes.map((like) => {
      console.log(like);
      const dataToSend = {
        "user_id" : user.user_id,
        "itinerary_id" : itineraryID,
        "affinity_type" : like
      };
      return createAffinity(authTokens.access, dataToSend, itineraryID);
    });
    window.location.href = `/itinerary/${itineraryID}/trip-summary`;
  }


  return (
    <>
      <h3>What do you like to do?</h3> 
      <div className="genres">
        <form className="genres" onSubmit={handleSubmit}>
          <div>
            <input type="checkbox" onChange={handleChange} id="art" name="art" value="art"/>
            <label htmlFor="art">Art</label>

            <input type="checkbox" onChange={handleChange} id="food" name="food" value="food"/>
            <label htmlFor="food">Food</label>

            <input type="checkbox" onChange={handleChange} id="history" name="history" value="history"/>
            <label htmlFor="history">History</label>

            <input type="checkbox" onChange={handleChange} id="nature" name="nature" value="nature"/>
            <label htmlFor="nature">Nature</label>

            <input type="checkbox" onChange={handleChange} id="music" name="music" value="music"/>
            <label htmlFor="music">Music</label>

            <input type="checkbox" onChange={handleChange} id="shopping" name="shopping" value="shopping"/>
            <label htmlFor="shopping">Shopping</label>

            <input type="checkbox" onChange={handleChange} id="thrills" name="thrills" value="thrills"/>
            <label htmlFor="thrills">Thrills</label>

            <input type="checkbox" onChange={handleChange} id="beach" name="beach" value="beach"/>
            <label htmlFor="beach">Beach</label>
          </div>
          <button type="submit" className="submit-btn" id="like-submit">Submit</button>

        </form>
      </div>  
    </>

  )

}

export default GenreSelector