const BASE_URL = process.env.REACT_APP_BASE_URL

const getAllSightsByItinerary = async (token, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/sight/`
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

const getSightByID = async (token, itineraryID, sightID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/sight/${sightID}/`
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

const createSight = async (token, data, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/sight/`
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

const editSight = async (token, data, itineraryID, sightID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/sight/${sightID}/`
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

const deleteSight = async (token, itineraryID, sightID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/sight/${sightID}/`
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
  getAllSightsByItinerary,
  getSightByID,
  createSight,
  editSight,
  deleteSight
};