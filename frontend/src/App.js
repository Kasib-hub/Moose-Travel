import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';

function App() {
  
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          
          {/* navbar would go here */}
          <Routes>

            <Route element={<PrivateRoutes />}>
            
              <Route path='/' element={<HomePage />} />
            </Route>

            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignUpPage />} />
            
          </Routes>

        </AuthProvider>

      </Router>
     
    </div>
  );
}

export default App;
