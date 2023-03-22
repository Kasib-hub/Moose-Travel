
const getAllItineraries = async (token) => {
  
  const BASE_URL = process.env.REACT_APP_BASE_URL
  const url = `http://${BASE_URL}/api/itinerary/`
  const context = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }
  const resp = await fetch(url, context)
  const body = await resp.json()
  if (resp.status === 400) {
    alert(JSON.stringify(body))
  } else {
    return body
  }
}

export {
  getAllItineraries,
};