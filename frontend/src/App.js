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


function App() {


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