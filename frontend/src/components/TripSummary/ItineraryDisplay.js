

function ItineraryDisplay ({itinerary}) {

  return (
      <div>
        <h2>{itinerary.itinerary_name}</h2>
        <p>{itinerary.summary}</p>
      </div>
  )

}

export default ItineraryDisplay