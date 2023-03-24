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

const getItineraryByID = async (token, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/`
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

const createItinerary = async (token, data) => {
  
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

const editItinerary = async (token, data, itineraryID) => {
  // first filter on all itineraries find the one or many that match on user_id and then.. match it on what? if a user has multiple itineraries how can we match on itinerary id without first having a way to directly access it?
  
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/`
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

const deleteItinerary = async (token, itineraryID) => {
  
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/`
  const context = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  }
  const res = await fetch(url, context)
  const body = await res.json()
  if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
  else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
  else {return body}
}

export {
  getAllItineraries,
  getItineraryByID,
  createItinerary,
  editItinerary,
  deleteItinerary
};