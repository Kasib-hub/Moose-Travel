import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Signup from './components/Signup/Signup';

function App() {
  return (
    <div className="App">

      <HashRouter>
      <Link to="/signup">Signup</Link>
      <p>The Key: {process.env.REACT_APP_MAPS_API_KEY}</p>
      <br></br>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<HomePage />} />
        </Routes>
      </HashRouter>
     
    </div>
  );
}

export default App;
