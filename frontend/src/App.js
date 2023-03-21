import './App.css';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Chatbot from './components/Chatbot';
import FlightSearch from './components/FlightSearch';
import HotelSearch from './components/HotelSearch';
import SupportEngine from './components/SupportEngine/SupportEngine'
import RoundTripSearchBar from './components/RoundTripSearchBar';
import DirectFlightSearchBar from './components/DirectFlightSearchBar';
import HotelSearchBar from './components/HotelSearchBar';
import MultiFlightSearchBar from './components/MultiFlightSearchBar';
import FlightSearchSelection from './components/FlightSearchSelection';
import { TransitionGroup } from "react-transition-group";
import { useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import FlyingQuestion from './components/FlyingQuestion';
import HotelQuestion from './components/HotelQuestion';
import Genres from './components/Genres';
import SpecificLocations from './components/SpecificLocations';
import Itinerary from './components/Itinerary';


const apiKey = 'prtl6749387986743898559646983194';
const origin = 'ATL-sky'; // Atlanta airport code
const destination = 'NYCA-sky'; // New York City airport code
const date = new Date().toISOString().slice(0, 10); // today's date in ISO format (YYYY-MM-DD)



// const getFlights = () => {

//   fetch(`https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/${origin}/${destination}/${date}`, {
//   headers: {
//     'x-api-key': apiKey
//   }
// })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     // Handle the response data here
//   })
//   .catch(error => {
//     console.error(error);
//     // Handle any errors here
//   });

// }

// console.log("Flight Data: ");
// getFlights();


function App() {

  const [currentComponent, setCurrentComponent] = useState(0);

  const handleFormSubmit = () => {
    setCurrentComponent(currentComponent + 1);
  };

  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={ <FlyingQuestion/>} />
        <Route path="/flight-search-selection" element={<FlightSearchSelection />} />
        <Route path="/hotel-question" element={<HotelQuestion />} />
        <Route path="/hotel-search-selection" element={<HotelSearchBar />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/specific-locations" element={<SpecificLocations />} />
        <Route path="/itinerary" element={<Itinerary />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

// function App() {

//   const [currentComponent, setCurrentComponent] = useState(0);

//   const handleFormSubmit = () => {
//     setCurrentComponent(currentComponent + 1);
//   };

//   return (
//     <div className="App">


//       {currentComponent === 0 && (
//         <HotelSearchBar onSubmit={handleFormSubmit} />
//       )}

//       {currentComponent === 1 && (
//        <FlightSearchSelection changeHomepageComponent={handleFormSubmit} />
//       )}

//       {currentComponent === 2 && (
//         <HotelSearchBar onSubmit={handleFormSubmit} />
//       )}


//     </div>
//   );
// }