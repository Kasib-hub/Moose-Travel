import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

// dummy homepage - we'll have these in a navBar
function HomePage() {

  let {user, logoutUser, authTokens} = useContext(AuthContext)

  return (
    <>
      <p>This is the Homepage - links to other pages</p>
      {user && <p>Hello {user.username} your id is {user.user_id} and your access token is {authTokens.access}</p>}
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/login'>Login</Link>
        <span> | </span>
        <Link to='/signup'>Signup</Link>
        <span> | </span>
        <button onClick={logoutUser}>Logout</button>
    </>
  );
}

export default HomePage;
