import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext, useEffect} from 'react';
import { getUserByID,editUserInfo } from '../api/User/User';
import AuthContext from '../context/AuthContext';
import { useParams} from 'react-router-dom';



function EditPersonalInfo() {
      let {user, authTokens} = useContext(AuthContext)
      const {userID} = useParams()
      //GET request to get user's info 
      const [userInfo, setUserInfo] = useState({})
      const BASE_URL = process.env.REACT_APP_BASE_URL
      useEffect(() => {
        fetch(`http://${BASE_URL}/api/user/${userID}/`)
          .then(res => {return res.json()}) 
          .then(data => {setUserInfo(data)})
          .catch((err)=>{console.log(err.message)})
          }
      ,[]) 
      // const username1 = userInfo.username
      // const useremail1 = userInfo.email
      // console.log(username1)
      //set state of elements needed in the User model
      const [username, setUserName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      // make PUT request to rest API 
      const updateInfo = async (e) =>{
            const newinfo = {username, password, email} 
            e.preventDefault();
            const updatePersonalInfo = await editUserInfo(authTokens.access, newinfo, userID)
      }   
  return (
    <>
      <p> Please update your personal info {userID}</p>
      <Form  onSubmit={updateInfo}>
      {/* form for updating username */}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter username" value = {userInfo.username}
                onChange = {(e) =>setUserInfo(username == e.target.value)} required/>
      </Form.Group>
      {/* form for updating email address */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  vaule={email}
                onChange = {(e) =>setEmail(e.target.value)} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {/* form for updating password */}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Password</Form.Label>
        <Form.Control type="text" placeholder="Enter password" value = {password}
                onChange = {(e) =>setPassword(e.target.value)} required/>
      </Form.Group>
      {/* button to make PUT request */}
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
      
    </>
  );
}

export default EditPersonalInfo;