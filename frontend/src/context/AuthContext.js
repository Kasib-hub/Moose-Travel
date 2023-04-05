import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // callback sets the state on the initial load (mount) not every single time state changes
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );

  const [amadeusToken, setAmadeusToken] = useState(() =>
    localStorage.getItem("amadeusToken") ? localStorage.getItem("amadeusToken") : null
  );

  const [avisToken, setAvisToken] = useState(() =>
    localStorage.getItem("avisToken") ? localStorage.getItem("avisToken") : null
  );

  const [errors, setErrors] = useState(null);

  const getAmadeusToken = useCallback(async () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const url = `http://${BASE_URL}/api/amadeus/token/`;
    const context = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
    };    
    const resp = await fetch(url, context);
    const body = await resp.json();
    if (resp.ok) {
      setAmadeusToken(body.access_token);
      localStorage.setItem("amadeusToken", body.access_token);
    } else {
      console.error("Error getting access token: " + resp.status);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const userObj = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(userObj);
    const BASE_URL = process.env.REACT_APP_BASE_URL || "localhost:8000";
    const url = `http://${BASE_URL}/api/token/`;
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    };
    const resp = await fetch(url, context);
    const body = await resp.json();
    if (!resp.ok) {
      setErrors(body);
    } else {
      console.log(body);
      alert("Login Successful!");
      setAuthTokens(body);
      setUser(jwt_decode(body.access));
      localStorage.setItem("authTokens", JSON.stringify(body));
      navigate("/");
    }
    getAmadeusToken(); // Call getAmadeusToken regardless of whether login was successful
  };
  
  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);
    setAmadeusToken(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("amadeusToken");
    navigate("/login");
  }, [navigate]);

  const getAvisToken = useCallback(async () => {
    const CLIENT_ID = process.env.REACT_APP_AVIS_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_AVIS_CLIENT_SECRET;
    const TOKEN_URL = "https://stage.abgapiservices.com/oauth/token/v1";
    const data = `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    };
    const resp = await fetch(TOKEN_URL, context);
    const body = await resp.json();
    if (resp.ok) {
      setAvisToken(body.access_token);
      localStorage.setItem("avisToken", body.access_token);
    } else {
      console.error("Error getting access token: " + resp.status);
    }
  };

const updateToken = useCallback(async () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const url = `http://${BASE_URL}/api/token/refresh/`;
  const context = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({'refresh': authTokens?.refresh})
  };
  const resp = await fetch(url, context);
  const body = await resp.json();
  if (resp.status === 200) {
    console.log('token updated');
    setAuthTokens(body);
    setUser(jwt_decode(body.access));
    localStorage.setItem('authTokens', JSON.stringify(body));
  } else {
    logoutUser();
  }
}, [authTokens?.refresh, logoutUser]);

// Refresh the token every 10 min.
useEffect(() => {
  const tokenInterval = setInterval(() => {
    if(authTokens) {
      updateToken();
    }
  }, 600000);
  return () => clearInterval(tokenInterval);
}, [authTokens, updateToken]);

// After
useEffect(() => {
  const amadeusTokenInterval = setInterval(() => {
    getAmadeusToken();
  }, 1500000);
  return () => clearInterval(amadeusTokenInterval);
}, [getAmadeusToken]); // Add getAmadeusToken to the dependency array


useEffect(() => {
  const avisTokenInterval = setInterval(() => {
    getAvisToken();
  }, 7200000);
  return () => clearInterval(avisTokenInterval);
}, [getAvisToken]);

let contextData = {
  loginUser: loginUser,
  logoutUser: logoutUser,
  amadeusToken: amadeusToken,
  authTokens: authTokens,
  errors: errors,
  user: user,
  avisToken: avisToken,
  getAvisToken: getAvisToken,
};

return (
  <AuthContext.Provider value={contextData}>
    {children}
  </AuthContext.Provider>
)
}
