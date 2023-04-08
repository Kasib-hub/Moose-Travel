function AffinitiesDisplay ({affinities}) {

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
      }
    </>
  )
}

export default AffinitiesDisplay