import Map from '../components/Map/Map'
import AutoCompleteInput from '../components/AutoComplete/AutoCompleteInput';


function MapsPage() {

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target.origin.value)
    console.log(e.target.destination.value)
  }

  return (
    <>
      <p>showing off autocomplete and map componenets</p>
      <form onSubmit={handleSubmit}>
        <AutoCompleteInput />
        <input type='submit' value='test'/>
      </form>
      <Map />
      
    </>
  );
}

export default MapsPage;