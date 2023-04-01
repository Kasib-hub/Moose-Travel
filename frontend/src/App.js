
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import StartItineraryPage from './pages/StartItineraryPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
// import { useLoadScript } from '@react-google-maps/api';
import TripSelectionPage from './pages/TripSelectionPage';
import ChooseFlightPage from './pages/ChooseFlightPage';
import ChooseHotelPage from './pages/ChooseHotelPage'
import ChooseCarPage from './pages/ChooseCarPage'
import ChooseActivityPage from './pages/ChooseActivityPage'
import ChooseRestaurantPage from './pages/ChooseRestaurantPage'
import TripSummaryPage from './pages/TripSummaryPage'

// import SupportEngine from './components/SupportEngine/SupportEngine';import RentalCarPage from './pages/RentalCarPage';


function App() {

  // the selections user makes on what forms they want to see when building their trip
  const [selections, setSelections] = useState([])

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* navbar would go here */}
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<StartItineraryPage />} />
              <Route path="/itinerary/:itineraryID/trip-selection" element={<TripSelectionPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-flight" element={<ChooseFlightPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-hotel" element={<ChooseHotelPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-car" element={<ChooseCarPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-restaurant" element={<ChooseRestaurantPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-activity" element={<ChooseActivityPage selections={selections} setSelections={setSelections}/>} />
              {/* This needs the tripsummary object likely from state */}
              <Route path="/itinerary/:itineraryID/trip-summary" element={<TripSummaryPage />} /> 
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