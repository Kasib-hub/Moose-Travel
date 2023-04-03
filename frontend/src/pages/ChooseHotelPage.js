import { useParams, useNavigate } from "react-router-dom"

function ChooseHotelPage ({selections, setSelections}) {
  let {itineraryID} = useParams()
  const navigate = useNavigate()

  const handleClick = () => {
    if (selections.length < 1) {
      console.log('empty array')
      return navigate(`/itinerary/${itineraryID}/choose-genre`)
    }
    console.log(selections)
    let route = selections[0]
    setSelections(selections.slice(1))
    navigate(route)
  }

  return (
    <>
      <h1>Hotel Page</h1>
      <button onClick={handleClick}>Next</button>
    </>
    
  )

}

export default ChooseHotelPage