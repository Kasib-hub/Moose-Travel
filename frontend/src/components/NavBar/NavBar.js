import './NavBar.css'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import { useContext, useState } from 'react';

// dummy NavBar - we'll have these in a navBar
function NavBar() {

  let {user, logoutUser} = useContext(AuthContext)

  // const [username, setUsername] = useState('')

  // needs to detect updated user state
  // useEffect(() => {
  //   const BASE_URL = process.env.REACT_APP_BASE_URL
  //   fetch(`http://${BASE_URL}/api/user/${user.user_id}/`)
  //     .then(res => {return res.json()}) 
  //     .then(data => {setUsername(data.username)})
  //     .catch((err)=>{console.log(err.message)})
  //     }, [username, user.user_id]) 

  return (
    <div className='navbar'>
      <div>
        <h2>Moose Travel</h2>
        {user && <Link to='/'>New Itinerary</Link>}
        {user && <Link to={`/itinerary/${user.user_id}/your-itineraries`}>Your Itineraries</Link>}
        {user && <Link to={`/itinerary/${user.user_id}/user-information`}>Personal Information</Link>}

        {/* conditionally render the login and signup links once logged in */}
        {!user && <Link to='/login'>Login</Link>}
        {!user && <Link to='/signup'>Signup</Link>}
        
      </div>
      <div className='user-text'>
        {user && <p>Welcome {username}!</p>}
        <button onClick={logoutUser} className='logout'>Logout</button>
      </div>

    </div>
  );
}

export default NavBar;