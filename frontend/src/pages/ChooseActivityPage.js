import ChosenActivities from "../components/ChosenActivities"
import { useParams, useNavigate } from 'react-router-dom';



function ChooseActivityPage({selections, setSelections}) {

  let {itineraryID} = useParams()
  let navigate = useNavigate()

  const ChangeRoute = () => {
    if (selections.length < 1) {
      return navigate(`/itinerary/${itineraryID}/choose-genre`)
    }
    console.log(selections)
    let route = selections[0]
    setSelections(selections.slice(1))
    navigate(route)
  }

  return (
    <>
      <h1>Activity Page</h1>
      <ChosenActivities ChangeRoute = {ChangeRoute} />
    </>
    
  )

}

export default ChooseActivityPage