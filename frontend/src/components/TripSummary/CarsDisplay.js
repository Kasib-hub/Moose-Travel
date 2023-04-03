function CarsDisplay ({rentals}) {
// I'm getting the rental properties from models.py in the backend

  return (
      rentals.map((rental, idx) => {
        return(
          <div key={idx}>
            <h3>{rental.rental_company}</h3>
            <p>{rental.pick_up_location} - {rental.pick_up_date}</p>
            <p>{rental.return_location} - {rental.return_date}</p>
          </div>
        )
      })
  )

}

export default CarsDisplay