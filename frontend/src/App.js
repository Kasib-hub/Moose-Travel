import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import StartItineraryPage from './pages/StartItineraryPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MapsPage from './pages/MapsPage';
import ApiExample from './pages/ApiExample';
import EditPersonalInfo from './pages/EditPersonalInfo';
import { useState } from 'react';
// import { useLoadScript } from '@react-google-maps/api';
import YourItinerariesPage from './pages/YourItineriesPage';
import TripSelectionPage from './pages/TripSelectionPage';
import ChooseFlightPage from './pages/ChooseFlightPage';
import ChooseHotelPage from './pages/ChooseHotelPage'
import ChooseActivityPage from './pages/ChooseActivityPage'
import ChooseRestaurantPage from './pages/ChooseRestaurantPage'
import RentalCarPage from './pages/RentalCarPage'
import ChooseGenrePage from './pages/ChooseGenrePage';
import TripSummaryPage from './pages/TripSummaryPage'

function App() {
  const [selections, setSelections] = useState([]);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/api-example" element={<ApiExample />} />
            <Route path="/personal-info/:userID" element={<EditPersonalInfo />} />
            <PrivateRoutes>
              <Route path="/itinerary/:itineraryID/trip-selection" element={<TripSelection selections={selections} setSelections={setSelections} />} />
              <Route path="/itinerary/:itineraryID/choose-flight" element={<ChooseFlight selections={selections} setSelections={setSelections} />} />
              <Route path="/itinerary/:itineraryID/choose-hotel" element={<ChooseHotel />} />
              <Route path="/itinerary/:itineraryID/choose-car" element={<ChooseCar />} />
              <Route path="/itinerary/:itineraryID/choose-restaurant" element={<ChooseRestaurant />} />
              <Route path="/itinerary/:itineraryID/choose-activity" element={<ChooseActivity />} />
            </PrivateRoutes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
