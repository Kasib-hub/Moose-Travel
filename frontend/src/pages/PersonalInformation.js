import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState} from 'react';
import Alert from 'react-bootstrap/Alert';
// import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useParams} from 'react-router-dom';


function PersonalInfo() {
      //to get user id so that can make PUT request to rest api - to specific user
      const {userID} = useParams()
      //set state of elements needed in the User model
      const [username, setUserName] = useState()
      const [email, setEmail] = useState()
      const [password, setPassword] = useState()
        // make PUT request to rest API 
        const updateInfo = (e) =>{
            const newinfo = {username, password, email} 
            e.preventDefault();
            fetch(`http://127.0.0.1:8000/api/user/${userID}/`,{
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(newinfo)
            } ).then(() =>{
                console.log('Personal information has been updated')
            })
        }   
  return (
    <>
      <p> Please update your personal info {userID}</p>
      <Form  onClick={updateInfo}>
      {/* form for updating username */}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value = {username}
                onChange = {(e) =>setUserName(e.target.value)}/>
      </Form.Group>
      {/* form for updating email address */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value = {email}
                onChange = {(e) =>setEmail(e.target.value)}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {/* form for updating password */}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Enter password" value = {password}
                onChange = {(e) =>setPassword(e.target.value)}/>
      </Form.Group>
      {/* button to make PUT request */}
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
      
    </>
  );
}

export default PersonalInfo;