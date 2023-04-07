import { useParams, useNavigate } from "react-router-dom"
import HotelSearchBar from "../components/HotelSearchBar"

function ChooseHotelPage ({selections, setSelections}) {
  let {itineraryID} = useParams()
  const navigate = useNavigate()

  const ChangeRoute = () => {
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
      <HotelSearchBar ChangeRoute={ChangeRoute}/>
    </>
    
  )

}

export default ChooseHotelPage