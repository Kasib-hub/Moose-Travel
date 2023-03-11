import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Signup from './components/Signup/Signup';

function App() {
  return (
    <div className="App">

      <HashRouter>
      <Link to="/signup">Signup</Link>
      <br></br>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          
        </Routes>
      </HashRouter>
     
    </div>
  );
}

export default App;
