function FlightsDisplay ({flights}) {

  if (flights.length === 0) return (null)

  return (
    <>
     <h2>Flights</h2>
      {
        flights.map((flight, idx) => {
          return(
            <div key={idx}>
              <p>{flight.flight_type} - {flight.departure} - {flight.departure_date}</p>
            </div>
          )
        })
      }<br></br>
    </>
  )
}
    
      

export default FlightsDisplay