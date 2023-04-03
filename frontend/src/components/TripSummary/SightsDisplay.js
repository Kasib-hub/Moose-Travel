function SightsDisplay ({sights}) {

  return (
      sights.map((sight, index) => {
        return(
          <div key={index}>
            <p>{sight.sight_name}</p>
          </div>
        )
      })
  )

}

export default SightsDisplay