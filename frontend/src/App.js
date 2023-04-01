
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { useState } from 'react';
// import { useLoadScript } from '@react-google-maps/api';
import TripSelection from './pages/TripSelection';
import ChooseFlight from './pages/ChooseFlight';
import ChooseHotel from './pages/ChooseHotel'
import ChooseCar from './pages/ChooseCar'
import ChooseActivity from './pages/ChooseActivity'
import ChooseRestaurant from './pages/ChooseRestaurant'

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