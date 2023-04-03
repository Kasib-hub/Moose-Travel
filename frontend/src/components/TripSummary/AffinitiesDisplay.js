function AffinitiesDisplay ({affinities}) {

  return (
      affinities.map((affinity, idx) => {
        return(
          <div key={idx}>
            <p>{affinity.affinity_type}</p>
          </div>
        )
      })
  )

}

export default AffinitiesDisplay