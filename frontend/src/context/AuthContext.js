import { createContext, useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom"

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {
  const navigate = useNavigate()

  let [authTokens, setAuthTokens] = useState(null)
  let [user, setUser] = useState(null)
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
      alert("Login Successful!")
    }
  }

  let contextData = {
    loginUser:loginUser,
    errors:errors,
  }

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )
}