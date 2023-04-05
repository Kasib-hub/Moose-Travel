import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage";
import MapsPage from "./pages/MapsPage";
import ApiExample from "./pages/ApiExample";
import EditPersonalInfo from "./pages/EditPersonalInfo";
import { useState } from "react";
import YourItineriesPage from "./pages/YourItineriesPage";
import TripSelection from "./pages/TripSelection";
import ChooseFlight from "./pages/ChooseFlight";
import ChooseHotel from "./pages/ChooseHotelPage";
import ChooseCar from "./pages/RentalCarPage";
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
              <Route path="/itinerary/:itineraryID/summary" element={<TripSummaryPage />} />
              <Route path="/your-itineraries" element={<YourItineriesPage />} />
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
