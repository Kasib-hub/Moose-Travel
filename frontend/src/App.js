
import './App.css'
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import Chatbot from './components/Chatbot';
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
    <div className="App">
      <Router>
        <AuthProvider>
          {/* navbar would go here */}
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/flight-search" element={<FlightSearch />} />
              <Route path="/maps" element={<MapsPage />}/>
              <Route path="/api-example" element={<ApiExample />}/>
              <Route path="/dashboard" element={<DashBoard />} /> {/* this will likely need to take in id at route  e.g. Route path="/dashboard/:userID"*/}
              <Route path="/amadeus-example" element={<AmadeusExample />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;

