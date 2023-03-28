import AuthContext from '../context/AuthContext';
import { useContext, useState } from 'react';

function AmadeusExample(){

  let [flight, setFlight] = useState()

  let {amadeusToken} = useContext(AuthContext)

  const findSingleFlight = async() => {
    fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-03-30&adults=1`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${amadeusToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setFlight(data);
    })
    .catch(error => console.error(error));
  }

  return(
    <>
      <p>Hi there your amadeus token is {amadeusToken}</p>
      <p>Let's make a flight request with this info</p>
      <button onClick={findSingleFlight}>Find a Flight!</button>
      {!flight ? <p></p> : <h3>{JSON.stringify(flight)}</h3>}
    </>
    
  )

}


export default AmadeusExample;