import React, { useState } from "react";

const MultiFlightSearchBar = () => {
  const [flights, setFlights] = useState([
    { id: 1, from: "", to: "", departureDate: "", returnDate: "" },
  ]);

  const handleAddFlight = () => {
    const newId = flights[flights.length - 1].id + 1;
    setFlights([
      ...flights,
      { id: newId, from: "", to: "", departureDate: "", returnDate: "" },
    ]);
  };

  const handleDeleteFlight = (id) => {
    const filteredFlights = flights.filter((flight) => flight.id !== id);
    setFlights(filteredFlights);
  };

  const handleFlightChange = (id, field, value) => {
    const updatedFlights = [...flights];
    const index = updatedFlights.findIndex((flight) => flight.id === id);
    updatedFlights[index][field] = value;
    setFlights(updatedFlights);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Handle search logic here
  };

  return (
    <div class="search-div">
        <form onSubmit={handleSearch}>

        {flights.map((flight) => (

            <div key={flight.id} className="search-form">
 
                    <div class="search-input">
                        <label style={{color: 'white', fontSize: '1.3rem'}}>From:</label>
                        <input
                            type="text"
                            value={flight.from}
                            onChange={(event) =>
                            handleFlightChange(flight.id, "from", event.target.value)
                            }
                        />
                    </div>

                    <div class="search-input">
                        <label style={{color: 'white', fontSize: '1.3rem'}}>To:</label>
                        <input
                            type="text"
                            value={flight.to}
                            onChange={(event) =>
                            handleFlightChange(flight.id, "to", event.target.value)
                            }
                        />
                    </div>

                    <div class="search-input">
                        <label style={{color: 'white', fontSize: '1.3rem'}}>Departure Date:</label>
                        <input
                            type="date"
                            value={flight.departureDate}
                            onChange={(event) =>
                            handleFlightChange(flight.id, "departureDate", event.target.value)
                            }
                        />
                    </div>

                    <div class="search-input">
                        <label style={{color: 'white', fontSize: '1.3rem'}}>Return Date:</label>
                        <input
                            type="date"
                            value={flight.returnDate}
                            onChange={(event) =>
                            handleFlightChange(flight.id, "returnDate", event.target.value)
                            }
                        />
                    </div>

                    <button type="button" onClick={() => handleDeleteFlight(flight.id)} className="deleteButton">
                        Delete Flight
                    </button>
                    
            </div>
        ))}
        <button type="button" onClick={handleAddFlight} className="add-search">
            Add Flight
        </button>
        <button type="submit" className="hotel-search">Search</button>
        </form>
    </div>
  );
};

export default MultiFlightSearchBar;
