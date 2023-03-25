import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import MapsPage from './pages/MapsPage';
import FlightSearch from './components/FlightSearch/FlightSearch';

function App() {

  // loading the google maps script
  const libraries = ['places']

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries
  })

  if (!isLoaded) return <h2>Loading...</h2>

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
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/dashboard" element={<DashBoard />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;