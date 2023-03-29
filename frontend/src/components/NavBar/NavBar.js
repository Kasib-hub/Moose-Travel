import './NavBar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

// dummy NavBar - we'll have these in a navBar
function NavBar() {

  let {user, logoutUser, authTokens} = useContext(AuthContext)

  return (
    <div className='navbar'>

        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/login'>Login</Link>
        <span> | </span>
        <Link to='/signup'>Signup</Link>
        <span> | </span>
        <button onClick={logoutUser}>Logout</button>
        {user && <p>Hello {user.username} your id is {user.user_id} and your access token is</p>}
    </div>
  );
}

export default NavBar;