import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import ListWines from "./components/ListWines"
import CreateWine from "./components/CreateWine"
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
    <div className="App">

      {currentComponent === 0 && (
        <HotelSearchBar onSubmit={handleFormSubmit} />
      )}

      {currentComponent === 1 && (
        <FlightSearchSelection />
      )}


    </div>
  );
}

export default App;
