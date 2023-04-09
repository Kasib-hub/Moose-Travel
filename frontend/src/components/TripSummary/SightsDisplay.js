function SightsDisplay ({sights}) {

  return (
    <>
      <h2>Sights</h2>
      {
        sights.map((sight, idx) => {
          return(
            <div key={idx}>
              <p>{sight.sight_name}</p>
            </div>
          )
        })
      }<br></br>
    </>
  )
}

export default SightsDisplay