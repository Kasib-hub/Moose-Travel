const BASE_URL = process.env.REACT_APP_BASE_URL

const getAllAffinitesByItinerary = async (token, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/affinity/`
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

const getAffinityByID = async (token, itineraryID, affinityID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/affinity/${affinityID}/`
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

const createAffinity = async (token, data) => {
  
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/affinity/`
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

const editAffinity = async (token, data, itineraryID, affinityID) => {
  // first filter on all itineraries find the one or many that match on user_id and then.. match it on what? if a user has multiple itineraries how can we match on itinerary id without first having a way to directly access it?
  
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/affinity/${affinityID}/`
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

const deleteAffinity = async (token, itineraryID, affinityID) => {
  
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/affinity/${affinityID}/`
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
  getAllAffinitesByItinerary,
  getAffinityByID,
  createAffinity,
  editAffinity,
  deleteAffinity
};