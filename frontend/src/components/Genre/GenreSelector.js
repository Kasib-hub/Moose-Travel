import ChatGPTSummaryRequest from "../ChatGPTSummaryRequest"
import "./GenreSelector.css"
import { useState } from "react";
import { useParams } from "react-router-dom"

function GenreSelector ({likes, setLikes}) {

  const [showSummary, setShowSummary] = useState(false);
  let {itineraryID} = useParams()

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
    setLikes(likes)
    setShowSummary(true)

    setTimeout(() => {
      window.location.href = `/itinerary/${itineraryID}/trip-summary`;
    }, 10000); // delay in milliseconds
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
        {showSummary && <ChatGPTSummaryRequest likes={likes} />}
      </div>  
    </>

  )

}

export default GenreSelector