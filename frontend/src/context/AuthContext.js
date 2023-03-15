import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

  

  const navigate = useNavigate()

  // callback sets the state on the initial load not every single time
  let [authTokens, setAuthTokens] = useState( () => {
      return localStorage.getItem('authTokens') 
    ? JSON.parse(localStorage.getItem('authTokens'))
    : null
    }
  )

  let [user, setUser] = useState( () => {
    return localStorage.getItem('authTokens') 
  ? jwt_decode(localStorage.getItem('authTokens'))
  : null
  }
    
  )
  let [errors, setErrors] = useState(null)

  const loginUser = async (e) => {
    e.preventDefault()
    const userObj = {
      "username": e.target.username.value,
      "email": e.target.email.value,
      "password": e.target.password.value
    }
    console.log(userObj)
    const BASE_URL = process.env.REACT_APP_BASE_URL
    const url = `http://${BASE_URL}/api/token/`
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userObj)
    }
    const resp = await fetch(url, context)
    const body = await resp.json()
    if (!resp.ok) {
      setErrors(body)
    } else {
      // structure = body.access or refresh token
      console.log(body)
      alert("Login Successful!")
      setAuthTokens(body)
      setUser(jwt_decode(body.access))
      localStorage.setItem('authTokens', JSON.stringify(body))
      navigate('/')
    }
  }

  let contextData = {
    loginUser:loginUser,
    errors:errors,
    user:user,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}