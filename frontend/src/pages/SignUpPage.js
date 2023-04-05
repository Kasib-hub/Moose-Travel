import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';



function SignUpPage() {

  const [errors, setErrors] = useState()

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userObj = {
      "username": e.target.username.value,
      "email": e.target.email.value,
      "password": e.target.password.value
    }
    console.log(userObj)
    signUpUser(userObj)
  }
  
  const signUpUser = async (userObj) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `http://${BASE_URL}/api/signup/`;
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
    }
    const resp = await fetch(url, context)
    const body = await resp.json()
    if (resp.status === 400) {
      setErrors(body)
    } else {
      alert('Signed Up Successfully!')
      navigate("/")
    }
  }

  return (
    <>
      {
        errors && 
        <Alert key="danger" variant="danger">
          {errors.username}
        </Alert>
      }
      <h2>&#9992; Sign up for Flights! &#9992;</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter username" required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
    </>
  );
}

export default SignUpPage;