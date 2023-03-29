
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MapsPage from './pages/MapsPage';
import ApiExample from './pages/ApiExample';
import { useLoadScript } from '@react-google-maps/api';
import DashBoard from './pages/DashBoard';
import AmadeusExample from './pages/AmadeusExample';


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

