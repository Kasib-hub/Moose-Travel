function CarsDisplay ({rentals}) {
// I'm getting the rental properties from models.py in the backend

  return (
    <>
      <h2>Rental Cars</h2>
      {
        rentals.map((rental, idx) => {
          return(
            <div key={idx}>
              <h3>{rental.rental_company}</h3>
              <p><em>PICKUP: </em>{rental.pick_up_location} - {rental.pick_up_date}</p>
              <p><em>RETURN: </em>{rental.return_location} - {rental.return_date}</p>
            </div>
          )
        })
      }
    </>
  )

}

export default CarsDisplay