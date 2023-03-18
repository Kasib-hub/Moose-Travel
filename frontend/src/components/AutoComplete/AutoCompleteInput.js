import { Autocomplete } from "@react-google-maps/api"
import { useState } from "react"
import './AutoComplete.css'

function AutoCompleteInput() {

  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")

  const options = {
    types:['airport']
  }

  const handleOriginSelection = (e) => {
    let regex = /\((.*?)\)/g
    let newStr = e.target.value.match(regex)
    setOrigin(newStr[0].replace(/[()[]]/g, ""))
  }

  const handleDestinationSelection = (e) => {
    let regex = /\((.*?)\)/g
    let newStr = e.target.value.match(regex)
    setDestination(newStr[0].replace(/[()[]]/g, ""))
  }

  const handleOriginInput = (e) => {
    setOrigin(e.target.value)
  }

  const handleDestinationInput = (e) => {
    setDestination(e.target.value)
  }

  return (
    <>
      <Autocomplete options={options}>
        <input id="origin" type='text' placeholder="enter origin" onBlur={handleOriginSelection} onChange={handleOriginInput} value={origin}/>
      </Autocomplete>
      <Autocomplete options={options}>
        <input id="destination" type='text' placeholder="enter destination" onBlur={handleDestinationSelection} onChange={handleDestinationInput} value={destination}/>
      </Autocomplete>
    </>

  );
}

export default AutoCompleteInput