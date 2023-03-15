import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function HomePage() {

  let {name} = useContext(AuthContext)

  return (
    <>
      <p>This is the Homepage - links to other pages</p>
      <p>Hello {name}</p>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/login'>Login</Link>
        <span> | </span>
        <Link to='/signup'>Signup</Link>
    </>
  );
}

export default HomePage;
