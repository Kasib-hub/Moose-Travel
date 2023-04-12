import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext } from 'react';
import Alert from 'react-bootstrap/Alert';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';

function LoginPage() {
  let {loginUser} = useContext(AuthContext)
  let {errors} = useContext(AuthContext)

  return (
    <>
      {
        errors && 
        <Alert key="danger" variant="danger">
          {errors.detail}
        </Alert>
      }
    <h2>&#9992; Login for Flights! &#9992;</h2>
    <Form onSubmit={loginUser} className="boot-form">
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
    <p>Don't have an account with us? <Link to={'/signup'} className="link">Signup</Link> now!</p>
    </>
  );
}

export default LoginPage;