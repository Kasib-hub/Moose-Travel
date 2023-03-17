import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

  const navigate = useNavigate()

  // callback sets the state on the initial load not every single time state changes
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
      // storing user information from the decoded token to AuthContext; user info available through entire app that way.
      console.log(body)
      alert("Login Successful!")
      setAuthTokens(body)
      setUser(jwt_decode(body.access))
      localStorage.setItem('authTokens', JSON.stringify(body))
      navigate('/')
    }
  }

  const logoutUser = useCallback(() => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }, [navigate])

  // if response ok, update tokens and user info. Else, logout the user


  let contextData = {
    loginUser:loginUser,
    logoutUser:logoutUser,
    authTokens:authTokens,
    errors:errors,
    user:user,
  }

  
  useEffect(() => {
    const updateToken = async () => {
      
      const BASE_URL = process.env.REACT_APP_BASE_URL
      const url = `http://${BASE_URL}/api/token/refresh/`
      const context = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({'refresh': authTokens?.refresh})
      }
      const resp = await fetch(url, context)
      const body = await resp.json()
      if (resp.status === 200) {
        console.log('token updated')
        setAuthTokens(body)
        setUser(jwt_decode(body.access))
        localStorage.setItem('authTokens', JSON.stringify(body))
      } else {
        logoutUser()
      }
    }

    // clear the stacked intervals to call updateToken, this way it is only called once per interval (10 min)
    let interval = setInterval(() => {
        if(authTokens) {updateToken()}
      }, 600000)
      return () => clearInterval(interval)
  }, [authTokens, logoutUser])

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}