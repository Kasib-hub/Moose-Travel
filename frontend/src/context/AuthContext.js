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
  let [loading, setLoading] = useState(true)

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

  // if response ok, update tokens and user info. Else, logout the user
  const updateToken = async () => {
    console.log('token updated')
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
      setAuthTokens(body)
      setUser(jwt_decode(body.access))
      localStorage.setItem('authTokens', JSON.stringify(body))
    } else {
      // put logout here
      alert('not authenticated, logout the user')
    }
    if (loading) {setLoading(false)}
  }

  let contextData = {
    loginUser:loginUser,
    // logoutUser:logoutUser,
    authTokens:authTokens,
    errors:errors,
    user:user,
  }

  // clear the stacked intervals to call updateToken, this way it is only called once per interval (4 min)
  useEffect(() => {
    if(loading) {updateToken()}

    let interval = setInterval(() => {
        if(authTokens) updateToken()
      }, 240000)
      return () => clearInterval(interval)
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}