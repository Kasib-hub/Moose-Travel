import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

  const navigate = useNavigate()

  // callback sets the state on the initial load (mount) not every single time state changes
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

  let [amadeusToken, setAmadeusToken] = useState( () => {
      return localStorage.getItem('amadeusToken') 
      ? localStorage.getItem('amadeusToken')
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
    getAmadeusToken()
  }

  const logoutUser = useCallback(() => {
    setAuthTokens(null)
    setUser(null)
    setAmadeusToken(null)
    localStorage.removeItem('authTokens')
    localStorage.removeItem('amadeusToken')
    navigate('/login')
  }, [navigate])

  const getAmadeusToken = async () => {
    console.log('amadeus!')
    const client_id = process.env.REACT_APP_CLIENT_ID
    const client_secret = process.env.REACT_APP_CLIENT_SECRET
    const url = `https://test.api.amadeus.com/v1/security/oauth2/token`
    const data = `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data
    }
    const resp = await fetch(url, context)
    const body = await resp.json()
    if (resp.status === 200) {
      setAmadeusToken(body.access_token)
      localStorage.setItem('amadeusToken', body.access_token)
    } else {
      alert("issue with your amadeus token")
    }
  }

  // if response ok, update tokens and user info. Else, logout the user


  let contextData = {
    loginUser:loginUser,
    logoutUser:logoutUser,
    amadeusToken:amadeusToken,
    authTokens:authTokens,
    errors:errors,
    user:user,
  }

  // refresh the token every 10 min.
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

  // refresh token from amadeus
  useEffect(() => {

    // updates every 5 minutes = 300000ms 
    let interval = setInterval(() => {
      if(amadeusToken) {getAmadeusToken()}
    }, 300000)
    return () => clearInterval(interval)
  }, [amadeusToken])

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}