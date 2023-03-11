import { useEffect, useState } from 'react'

function ListWines() {

  const [wines, setWines] = useState([])

  useEffect( () => {
    async function getWines() {
      const base_url = process.env.REACT_APP_BASE_URL
      const res = await fetch(`http://${base_url}/api/`)
      const body = await res.json()
      console.log(body)
      setWines(body.result)
    }
    getWines()
  }, [])

  const createWineList = () => {
    return wines.map( w => <h2>{w.wine_name}</h2>)
  }


  return(
    <>
      <h2>List Wines</h2>
      {wines && createWineList()}
    </>
  )
}

export default ListWines