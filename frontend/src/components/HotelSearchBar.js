import React, { useState } from "react";
import { useNavigate } from 'react-router';
import AnimatedPage from "./AnimatedPage";


const HotelSearchBar = ({ onSubmit }) => {

  const navigate = useNavigate();

  const [hotels, setHotels] = useState([
    { id: 1, from: "", to: "", departureDate: "", returnDate: "" },
  ]);

  const handleAddHotel = () => {
    const newId = hotels[hotels.length - 1].id + 1;
    setHotels([
      ...hotels,
      { id: newId, from: "", to: "", departureDate: "", returnDate: "" },
    ]);
  };

  const handleDeleteHotel = (id) => {
    const filteredHotels = hotels.filter((hotel) => hotel.id !== id);
    setHotels(filteredHotels);
  };

  const handleHotelChange = (id, field, value) => {
    const updatedHotels = [...hotels];
    const index = updatedHotels.findIndex((hotel) => hotel.id === id);
    updatedHotels[index][field] = value;
    setHotels(updatedHotels);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // Handle search logic here
    // When done, move to the next component
    // e.g. using React Router: history.push("/component2");
    onSubmit();
  };

  return (
    // <AnimatedPage>
    <div class="search-div">

            <form onSubmit={() => navigate("/genres")}>
            {hotels.map((hotel) => (

                    <div key={hotel.id} className="search-form">

                        <div class="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>From:</label>
                            <input
                                type="text"
                                value={hotel.from}
                                onChange={(event) =>
                                handleHotelChange(hotel.id, "from", event.target.value)
                                }
                            />
                        </div>

                        <div class="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>To:</label>
                            <input
                                type="text"
                                value={hotel.to}
                                onChange={(event) =>
                                handleHotelChange(hotel.id, "to", event.target.value)
                                }
                            />
                        </div>

                        <div class="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>Check-in Date:</label>
                            <input
                                type="date"
                                value={hotel.departureDate}
                                onChange={(event) =>
                                handleHotelChange(hotel.id, "departureDate", event.target.value)
                                }
                            />
                        </div>

                        <div class="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>Check-out Date:</label>
                            <input
                                type="date"
                                value={hotel.returnDate}
                                onChange={(event) =>
                                handleHotelChange(hotel.id, "returnDate", event.target.value)
                                }
                            />
                        </div>

                        <div class="search-input">
                            <p classname="label" style={{color: 'white', fontSize: '1.3rem'}}>Guests</p>
                            <select>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            </select>
                        </div>

                        <button type="button" onClick={() => handleDeleteHotel(hotel.id)} class="search-button" className="deleteButton">
                            Delete Hotel
                        </button>

                    </div>
            ))}
            <button type="button" onClick={handleAddHotel} className="add-search">
                Add Hotel
            </button>
            <button type="submit" className="hotel-search">Search</button>
            </form>
    
    </div>
    // </AnimatedPage>
  );
};

export default HotelSearchBar;

