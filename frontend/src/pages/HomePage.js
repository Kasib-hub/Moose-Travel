import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';

function HomePage() {

  // let {user, logoutUser, authTokens} = useContext(AuthContext)
  let {user, logoutUser} = useContext(AuthContext)
    
  return (
    <>
    
      <div className='dashboard'>  
        <div class="card card1">
            {/* <img src="..." class="card-img-top" alt="Mooose Smile Face pic"/> */}
            <div class="card-body">
            <h5 class="card-title">Moose TAG</h5>
            <p class="card-text">
                <ul>
                   Name: {user.username}
                </ul>
                <ul>
                   Email Address: {user.emailaddress}
                </ul>
            </p>
            <a href="#" class="btn btn-primary">Edit</a> {/* redirect to edit personal info */}
            </div>
        </div>
        <div class="card card2">
            {/* <img src="https://mail.google.com/mail/u/0?ui=2&ik=0b6b73b816&attid=0.1.1&permmsgid=msg-f:1760883512235516729&th=186fea398da3e339&view=fimg&fur=ip&sz=s0-l75-ft&attbid=ANGjdJ84NfZdGgRYx_cKGLn-wJ3yG5kWOG6l6yu_wRndoyUHAh8NwLPCjb28i1OF2OoKWvSWmrVfBZrBBNCQyoIrBYy7LDNaUeUCmiXnVRvlRTW57AVJXziiKrXTvyc&disp=emb" class="card-img-top" alt="Moose in the Wood pic"/> */}
            <div class="card-body">
            <h5 class="card-title">Moose Traces</h5>
            <p class="card-text">
                <li>
                    show names of itineraries and link to it
                </li>
            </p>
            <a href="#" class="btn btn-primary">Add</a> {/* redirect to edit personal info */}
            </div>
        </div>
        </div>
    </>
  );
}

export default HomePage;


{/* <Link to='/'>Home</Link> */}
        {/* <span> | </span> */}
        {/* <Link to='/login'>Login</Link> */}
        {/* <span> | </span>
        <Link to='/signup'>Signup</Link>
        <span> | </span>
        <button onClick={logoutUser}>Logout</button> */}
