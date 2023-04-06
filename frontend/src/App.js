import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import { Navigate } from 'react-router-dom';
import MapsPage from "./pages/MapsPage";
import ApiExample from "./pages/ApiExample";
import EditPersonalInfo from "./pages/EditPersonalInfo";
import { useState } from "react";
import YourItineriesPage from "./pages/YourItineriesPage";
import TripSelection from "./pages/TripSelectionPage";
import ChooseFlight from "./pages/ChooseFlightPage";
import ChooseHotel from "./pages/ChooseHotelPage";
import ChooseCar from "./pages/ChooseCarPage";
import ChooseRestaurant from "./pages/ChooseRestaurantPage";
import ChooseActivity from "./pages/ChooseActivityPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TripSummaryPage from "./pages/TripSummaryPage";

function App() {
  const [selections, setSelections] = useState([]);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<StartItineraryPage />} />
              <Route path="/itinerary/:userID/your-itineraries" element={<YourItinerariesPage />} />
              <Route path="/itinerary/:itineraryID/trip-selection" element={<TripSelectionPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-flight" element={<ChooseFlightPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-hotel" element={<ChooseHotelPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-car" element={<RentalCarPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-restaurant" element={<ChooseRestaurantPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-activity" element={<ChooseActivityPage selections={selections} setSelections={setSelections}/>} />
              <Route path="/itinerary/:itineraryID/choose-genre" element={<ChooseGenrePage likes={likes} setLikes={setLikes}/>} />
              {/* Trip summary makes the get requests*/}
              <Route path="/itinerary/:itineraryID/trip-summary" element={<TripSummaryPage />} /> 
              <Route path="/itinerary/:itineraryID/gpt" element={<ChatGPTSummaryRequest likes={likes}/>}/>
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
