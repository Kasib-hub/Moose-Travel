import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Signup from './components/Signup/Signup';
import FlightSearch from './components/FlightSearch/FlightSearch';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Link to="/signup">Signup</Link>
        <br />
        <Link to="/flight-search">Flight Search</Link>
        <br />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/flight-search" element={<FlightSearch />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
