import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import StartItineraryPage from './pages/StartItineraryPage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import { useLoadScript } from '@react-google-maps/api';
import EditPersonalInfo from './pages/EditPersonalInfo';
import { useState } from 'react';
import YourItinerariesPage from './pages/YourItineriesPage';
import TripSelectionPage from './pages/TripSelectionPage';
import ChooseFlightPage from './pages/ChooseFlightPage';
import ChooseHotelPage from './pages/ChooseHotelPage'
import ChooseActivityPage from './pages/ChooseActivityPage'
import RentalCarPage from './pages/RentalCarPage'
import ChooseGenrePage from './pages/ChooseGenrePage';
import TripSummaryPage from './pages/TripSummaryPage';
import DeleteTripSummaryPage from './pages/DeleteTripSummaryPage';
// import SupportEngine from './components/SupportEngine/SupportEngine';

function App() {
  // loading the google maps script

  // let user = localStorage.getItem('authTokens')

  const libraries = ['places']

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries
  })

  // the selections user makes on what forms they want to see when building their trip
  const [selections, setSelections] = useState([])
  // the genres the user likes
  const [likes, setLikes] = useState([])



  if (!isLoaded) return <h2>Loading...</h2>

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<StartItineraryPage />} />
              <Route path="/itinerary/:userID/your-itineraries" element={<YourItinerariesPage />} />
              <Route path="/itinerary/:userID/user-information" element={<EditPersonalInfo />} />
              <Route path="/itinerary/:itineraryID/trip-selection" element={<TripSelectionPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-flight" element={<ChooseFlightPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-hotel" element={<ChooseHotelPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-car" element={<RentalCarPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-activity" element={<ChooseActivityPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-genre" element={<ChooseGenrePage likes={likes} setLikes={setLikes}/>} />
              {/* Trip summary makes the get requests*/}
              <Route path="/itinerary/:itineraryID/trip-summary" element={<TripSummaryPage />} /> 
              <Route path="/itinerary/:itineraryID/trip-summary/delete" element={<DeleteTripSummaryPage />} /> 
              
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
          {/* {user && <SupportEngine />} */}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;