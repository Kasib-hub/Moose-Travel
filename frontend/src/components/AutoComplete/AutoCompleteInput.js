import { Autocomplete } from "@react-google-maps/api"
import { useState } from "react"
import './AutoComplete.css'

function AutoCompleteInput() {

  const [iataCode, setIataCode] = useState("")

  const options = {
    types:['airport']
  }

  const handleSelection = (e) => {
    let regex = /\((.*?)\)/g
    let newStr = e.target.value.match(regex)
    setIataCode(newStr[0].replace(/[\(\)\[\]]/g, ""))
  }

  const handleInput = (e) => {
    setIataCode(e.target.value)
  }

  return (
      <Autocomplete options={options}>
        <input id="placeholder_id" type='text' placeholder="find a place" onBlur={handleSelection} onChange={handleInput} value={iataCode}/>
      </Autocomplete>
  );
}

export default AutoCompleteInput