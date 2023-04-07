import TripSelector from '../components/TripSelector/TripSelector';


function TripSelection({selections, setSelections}) {

  return (
    <div>
      <h1>Customize your trip!</h1>
      <TripSelector selections={selections} setSelections={setSelections}/>
    </div>
  );
}

export default TripSelection;