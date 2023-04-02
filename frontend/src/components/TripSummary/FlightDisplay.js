function FlightDisplay ({flights}) {

  return (
      flights.map((flight, idx) => {
        return(
          <div key={idx}>
            <p>{flight.flight_type} - {flight.departure} - {flight.departure_date}</p>
          </div>
        )
      })
  )

}

export default FlightDisplay