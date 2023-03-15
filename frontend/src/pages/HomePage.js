import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <p>This is the Homepage - links to other pages</p>
        <Link to='/'>Home</Link>
        <span> | </span>
        <Link to='/login'>Login</Link>
        <span> | </span>
        <Link to='/signup'>Signup</Link>
    </>
  );
}

export default HomePage;
