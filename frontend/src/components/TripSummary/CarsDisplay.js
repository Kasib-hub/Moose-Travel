function CarsDisplay ({cars}) {
// I'm getting the rental properties from models.py in the backend

  return (
    <>
      <h2>Rentals</h2>
      {
        cars.map((car, idx) => {
          return(
            <div key={idx}>
              <h3>{car.rental_company} - {car.make} {car.model}</h3>
              <p><strong>PICKUP: </strong>{car.pick_up_location} - {car.pick_up_date}</p>
              <p><strong>RETURN: </strong>{car.return_location} - {car.return_date}</p>
            </div>
          )
        })
      }<br></br>
    </>
  )

}

export default CarsDisplay