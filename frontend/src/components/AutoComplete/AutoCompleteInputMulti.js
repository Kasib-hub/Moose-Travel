import { Autocomplete } from "@react-google-maps/api"
import { useState } from "react"
import './AutoComplete.css'

function AutoCompleteInputMulti({name, placeholder, flight_type, onChange}) {

  const [origin, setOrigin] = useState("")

  const options = {
    types:['airport']
  }

  const handleOriginSelection = (e) => {
    let regex = /\((.*?)\)/g
    let newStr = e.target.value.match(regex)
    setOrigin(newStr[0].replace(/\(|\)/g, ""))
  }

  const handleOriginInput = (e) => {
    setOrigin(e.target.value)
  }

  return (
    <>
      <Autocomplete options={options}>
        <input id={name} type='text' placeholder={placeholder} onBlur={handleOriginSelection} onChange={onChange} value={flight_type}/>
      </Autocomplete>
    </>

  );
}

export default AutoCompleteInputMulti