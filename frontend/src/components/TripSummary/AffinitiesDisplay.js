function AffinitiesDisplay ({affinities}) {

  if (affinities.length === 0) return null

  return (
    <>
      <h2>Affinities</h2>
      {
        affinities.map((affinity, idx) => {
          return(
            <div key={idx}>
              <p>{affinity.affinity_type}</p>
            </div>
          )
        })
      }<br></br>
    </>
  )
}

export default AffinitiesDisplay