import './NavBar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

// dummy NavBar - we'll have these in a navBar
function NavBar() {

  let {user, logoutUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <div>
        <h2>Moose Travel</h2>
        <Link to='/'>Home</Link>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
        
      </div>
      <div className='user-text'>
        {user && <p>Welcome {user.username}!</p>}
      </div>
      <button onClick={logoutUser}>Logout</button>

    </div>
  );
}

export default NavBar;