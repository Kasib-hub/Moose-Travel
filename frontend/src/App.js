import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
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
            <Route path="/maps" element={<MapsPage />} />
            <Route path="/api-example" element={<ApiExample />} />
            <Route path="/personal-info/:userID" element={<EditPersonalInfo />} />
            <Route path="/itinerary/:itineraryID/trip-selection" render={() => {
              return localStorage.getItem('token') ? <TripSelection selections={selections} setSelections={setSelections} /> : <Navigate to='/login' replace={true} />;
            }} />
            <Route path="/itinerary/:itineraryID/choose-flight" render={() => {
              return localStorage.getItem('token') ? <ChooseFlight selections={selections} setSelections={setSelections} /> : <Navigate to='/login' replace={true} />;
            }} />
            <Route path="/itinerary/:itineraryID/choose-hotel" element={<ChooseHotel />} />
            <Route path="/itinerary/:itineraryID/choose-car" element={<ChooseCar />} />
            <Route path="/itinerary/:itineraryID/choose-restaurant" element={<ChooseRestaurant />} />
            <Route path="/itinerary/:itineraryID/choose-activity" element={<ChooseActivity />} />
            <Route path="/itinerary/:itineraryID/summary" element={<TripSummaryPage />} />
            <Route path="/your-itineraries" element={<YourItineriesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
