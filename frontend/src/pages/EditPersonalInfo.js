import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { React, useState, useContext, useEffect} from 'react';
import AuthContext from '../context/AuthContext';
import { useParams} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";


function EditPersonalInfo() {
      let {authTokens} = useContext(AuthContext)
      const {userID} = useParams()
      //GET request to get user's info 
      const [userInfo, setUserInfo] = useState({})
      const BASE_URL = process.env.REACT_APP_BASE_URL
      useEffect(() => {
        fetch(`http://${BASE_URL}/api/user/${userID}/`)
          .then(res => {return res.json()}) 
          .then(data => {setUserInfo(data)})
          .catch((err)=>{console.log(err.message)})
          }) 
      // make PUT request to rest API 
      const putUser = async (data) => {
        const url = `http://${BASE_URL}/api/user/${userID}/`
        const context = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${authTokens.access}`
          },
          body: JSON.stringify(data)
        }
        const res = await fetch(url, context)
        const body = await res.json()
        if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
        else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
        else {alert("user updated!")}
      }
      // make PUT request to rest API 
      const handleSubmit = (e) => {
        e.preventDefault();
        const newinfo = {
          "username": e.target.username.value,
          "email": e.target.email.value,
          "password": e.target.password.value
        }

        putUser(newinfo)

      }
  
      const handleChange = (e) => {
        setUserInfo((prevState) => ({
          ...prevState, [e.target.name]: e.target.value
        }))
      }

    // adding camouglage to password input
    const eye = <FontAwesomeIcon icon={faEye} />;
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

  return (
    <>
      <p> Please update your personal info {userID}</p>
      <Form  onSubmit={handleSubmit}>
      {/* form for updating username */}
      <Form.Group className="mb-3" controlId="username">
        <Form.Label>User Name</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name="username" value = {userInfo.username}
                onChange = {handleChange} required/>
      </Form.Group>
      {/* form for updating email address */}
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" vaule={userInfo.email}
                onChange = {handleChange} required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      {/* form for updating password */}
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type={passwordShown ? "text" : "password"} placeholder="Enter password" name="password" value = {userInfo.password}
                onChange = {handleChange} required/>
                <i onClick={togglePasswordVisiblity}>{eye}</i>
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