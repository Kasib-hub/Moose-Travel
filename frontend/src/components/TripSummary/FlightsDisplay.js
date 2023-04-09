function FlightsDisplay ({flights}) {

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