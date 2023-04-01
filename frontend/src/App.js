
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

import MapsPage from './pages/MapsPage';
import FlightSearch from './components/FlightSearch/FlightSearch';
import ApiExample from './pages/ApiExample';
import { useLoadScript } from '@react-google-maps/api';
import EditPersonalInfo from './pages/EditPersonalInfo';

import { useState } from 'react';
// import { useLoadScript } from '@react-google-maps/api';
import TripSelection from './pages/TripSelection';
import ChooseFlight from './pages/ChooseFlight';
import ChooseHotel from './pages/ChooseHotel'
import ChooseCar from './pages/ChooseCar'
import ChooseActivity from './pages/ChooseActivity'
import ChooseRestaurant from './pages/ChooseRestaurant'

function App() {
  // loading the google maps script
  const libraries = ['places']



// import SupportEngine from './components/SupportEngine/SupportEngine';import RentalCarPage from './pages/RentalCarPage';

  // the selections user makes on what forms they want to see when building their trip
  const [selections, setSelections] = useState([])

  return (
    <div className="App">
      <Router>
        <AuthProvider>

          <Routes>
              <Route element={<PrivateRoutes />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/flight-search" element={<FlightSearch />} />
              <Route path="/maps" element={<MapsPage />}/>
              <Route path="/api-example" element={<ApiExample />}/>
              <Route path="/personal-info/:userID" element={<EditPersonalInfo />}/>
          </Routes>
          {/* navbar would go here */}
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/itinerary/:itineraryID/trip-selection" element={<TripSelection selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-flight" element={<ChooseFlight selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-hotel" element={<ChooseHotel />} />
              <Route path="/itinerary/:itineraryID/choose-car" element={<ChooseCar />} />
              <Route path="/itinerary/:itineraryID/choose-restaurant" element={<ChooseRestaurant />} />
              <Route path="/itinerary/:itineraryID/choose-activity" element={<ChooseActivity />} />

            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          {/* <SupportEngine /> */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;