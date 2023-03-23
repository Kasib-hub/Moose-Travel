// with no ids in the url, we will have to first iterate through entire entries per model and filter each
// of them by the user_id and then store those objeects ids (not the user_id) in a data structure/state to make the subsequent api calls
// to DELETE/PUT, a little bit more steps but should still be doable

const BASE_URL = process.env.REACT_APP_BASE_URL

const getAllItineraries = async (token) => {
  const url = `http://${BASE_URL}/api/itinerary/`
  const context = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }
  const res = await fetch(url, context)
  const body = await res.json()
  if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
  else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
  else {return body}
}

const createItinerary = async (data ,token) => {
  
  const url = `http://${BASE_URL}/api/itinerary/`
  const context = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }
  const res = await fetch(url, context)
  const body = await res.json()
  if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
  else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
  else {return body}
}

const editItinerary = async (data ,token) => {
  
  const url = `http://${BASE_URL}/api/itinerary/`
  const context = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }
  const res = await fetch(url, context)
  const body = await res.json()
  if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
  else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
  else {return body}
}

const deleteItinerary = async (data ,token) => {
  
  const url = `http://${BASE_URL}/api/itinerary/`
  const context = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }
  const res = await fetch(url, context)
  const body = await res.json()
  if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
  else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
  else {return body}
}

export {
  getAllItineraries,
  createItinerary
};