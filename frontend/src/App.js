import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MapsPage from './pages/MapsPage';
import ApiExample from './pages/ApiExample';
// import { useLoadScript } from '@react-google-maps/api';
import DashBoard from './pages/DashBoard';
import AmadeusExample from './pages/AmadeusExample';
import FlightSearchSelection from './components/FlightSearchSelection.js'
import HotelSearchBar from './components/HotelSearchBar'



function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          {/* navbar would go here */}
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/maps" element={<MapsPage />} />
              <Route path="/api-example" element={<ApiExample />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/amadeus-example" element={<AmadeusExample />} />
              {/* <Route path="/rental-car" element={<RentalCarPage />} /> */}
              <Route path="/flight-search-selection" element={<FlightSearchSelection />} />
              <Route path="/hotel-search-selection" element={<HotelSearchBar />} />
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