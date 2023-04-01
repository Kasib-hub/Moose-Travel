import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createItinerary } from "../api/Itinerary/Itinerary";
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


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

  let {user, authTokens} = useContext(AuthContext)

  const navigate = useNavigate()

  // This form POSTS the itinerary
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      "itinerary_name": e.target.name.value,
      "user_id": user.user_id
    }
    const postedItinerary = await createItinerary(authTokens.access, data)
    postedItinerary && navigate(`/itinerary/${postedItinerary.id}/trip-selection`)
    // route to the created page
  }


  return (
    <div>
      <h1>Welcome to Moose Travel</h1>
      <h2>You're Best Travel Partner</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name your Trip!</Form.Label>
          <Form.Control type="text" placeholder="Enter a Name" required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Itinerary
        </Button>
      </Form>
    </div>
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
