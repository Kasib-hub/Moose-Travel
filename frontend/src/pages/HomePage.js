import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

// dummy homepage - we'll have these in a navBar
function HomePage() {

  let {user} = useContext(AuthContext)

  return (
    <>
      <p>This is the Homepage - links to other pages</p>
      {user && <p>Hello {user.username} your id is {user.user_id}</p>}
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/login'>Login</Link>
        <span> | </span>
        <Link to='/signup'>Signup</Link>
        <span> | </span>
    </>
  );
}

export default HomePage;
