const BASE_URL = process.env.REACT_APP_BASE_URL

const getAllHotelsByItinerary = async (token, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/hotel/`
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

const getHotelByID = async (token, itineraryID, hotelID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/hotel/${hotelID}/`
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

const createHotel = async (token, data, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/hotel/`
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

const editHotel = async (token, data, itineraryID, hotelID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/hotel/${hotelID}/`
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

const deleteHotel = async (token, itineraryID, hotelID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/hotel/${hotelID}/`
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
  getAllHotelsByItinerary,
  getHotelByID,
  createHotel,
  editHotel,
  deleteHotel
};