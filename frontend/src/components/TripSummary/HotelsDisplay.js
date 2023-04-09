function HotelsDisplay ({hotels}) {

  return (
    <>
      <h2>Hotels</h2>
        {
          hotels.map((hotel, idx) => {
            return(
              <div key={idx}>
                <h3>{hotel.hotel_name}</h3>
                <p>{hotel.location}</p>
                <p>{hotel.check_in_date} - {hotel.check_out_date}</p>
              </div>
            )
          })
        }<br></br>
    </>
  )
      
        
    


}

export default HotelsDisplay