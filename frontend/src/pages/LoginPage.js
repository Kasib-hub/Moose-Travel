import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
import AuthContext from '../context/AuthContext';

function LoginPage() {
  let {loginUser} = useContext(AuthContext)
  let {errors} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const userObj = {
      "username": e.target.username.value,
      "email": e.target.email.value,
      "password": e.target.password.value
    }
    console.log(userObj)
  }

  return (
    <>
    {/* this would look nice as bootstrap error message */}
    
      {
        errors && 
        <Alert key="danger" variant="danger">
          {errors.detail}
        </Alert>
      }
    <h2>&#9992; Login for Flights! &#9992;</h2>
    <Form onSubmit={loginUser}>
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
        Login
      </Button>
    </Form>
    </>
  );
}

export default LoginPage;