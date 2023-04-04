const BASE_URL = process.env.REACT_APP_BASE_URL;

// Car functions
const getAllCarsByItinerary = async (token, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/car/`;
  const context = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const res = await fetch(url, context);
  const body = await res.json();
  if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
  else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
  else {return body}
};

const getCarByID = async (token, itineraryID, carID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/car/${carID}/`;
  const context = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const res = await fetch(url, context);
  const body = await res.json();
  if (res.status === 400) {
    alert(`Error: ${JSON.stringify(body)}`);
  } else if (!res.ok) {
    alert(`${res.status} (${res.statusText})`);
  } else {
    return body;
  }
};

const createCar = async (token, data, itineraryID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/car/`;
  const context = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, context);
  const body = await res.json();
  if (res.status === 400) {
    alert(`Error: ${JSON.stringify(body)}`);
  } else if (!res.ok) {
    alert(`${res.status} (${res.statusText})`);
  } else {
    return body;
  }
};

const editCar = async (token, data, itineraryID, carID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/car/${carID}/`;
  const context = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, context);
  const body = await res.json();
  if (res.status === 400) {
    alert(`Error: ${JSON.stringify(body)}`);
  } else if (!res.ok) {
    alert(`${res.status} (${res.statusText})`);
  } else {
    return body;
  }
};

const deleteCar = async (token, itineraryID, carID) => {
  const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/car/${carID}/`;
  const context = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const res = await fetch(url, context);
  const body = await res.json();
  if (res.status === 400) {
    alert(`Error: ${JSON.stringify(body)}`);
  } else if (!res.ok) {
    alert(`${res.status} (${res.statusText})`);
  } else {
    return body;
  }
};
  
  // Reservation functions
  const getAllReservationsByItinerary = async (token, itineraryID) => {
    const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/reservation/`;
    const context = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const res = await fetch(url, context);
    const body = await res.json();
    if (res.status === 400) {alert(`Error: ${JSON.stringify(body)}`)} 
    else if (!res.ok) {alert(`${res.status} (${res.statusText})`)} 
    else {return body}
  };
  
  const getReservationByID = async (token, itineraryID, reservationID) => {
    const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/reservation/${reservationID}/`;
    const context = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const res = await fetch(url, context);
    const body = await res.json();
    if (res.status === 400) {
      alert(`Error: ${JSON.stringify(body)}`);
    } else if (!res.ok) {
      alert(`${res.status} (${res.statusText})`);
    } else {
      return body;
    }
  };
  
  const createReservation = async (token, data, itineraryID) => {
    const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/reservation/`;
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(url, context);
    const body = await res.json();
    if (res.status === 400) {
      alert(`Error: ${JSON.stringify(body)}`);
    } else if (!res.ok) {
      alert(`${res.status} (${res.statusText})`);
    } else {
      return body;
    }
  };
  
  const editReservation = async (token, data, itineraryID, reservationID) => {
    const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/reservation/${reservationID}/`;
    const context = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };
    const res = await fetch(url, context);
    const body = await res.json();
    if (res.status === 400) {
      alert(`Error: ${JSON.stringify(body)}`);
    } else if (!res.ok) {
      alert(`${res.status} (${res.statusText})`);
    } else {
      return body;
    }
  };
  
  const deleteReservation = async (token, itineraryID, reservationID) => {
    const url = `http://${BASE_URL}/api/itinerary/${itineraryID}/reservation/${reservationID}/`;
    const context = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
    const res = await fetch(url, context);
    const body = await res.json();
    if (res.status === 400) {
      alert(`Error: ${JSON.stringify(body)}`);
    } else if (!res.ok) {
      alert(`${res.status} (${res.statusText})`);
    } else {     
      return body;
    }
  };

  export {
    // Car functions
    getAllCarsByItinerary,
    getCarByID,
    createCar,
    editCar,
    deleteCar,
  
    // Reservation functions
    getAllReservationsByItinerary,
    getReservationByID,
    createReservation,
    editReservation,
    deleteReservation,
  };