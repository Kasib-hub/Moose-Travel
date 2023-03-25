import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import AnimatedPage from "./AnimatedPage";


const HotelSearchBar = () => {

    const travel_token = "6KXp6oaqI0gvTGmUk50v3a9KLdGX"
    const [searchedHotels, setSearchedHotels] = useState(null)
    let hotelOffers = []
    const [guests, setGuests] = useState(1);

  const navigate = useNavigate();

  const [hotels, setHotels] = useState([
    { id: 1, cityCode: "", checkInDate: "", checkOutDate: "" },
  ]);

  const handleAddHotel = () => {
    const newId = hotels[hotels.length - 1].id + 1;
    setHotels([
      ...hotels,
      { id: newId, cityCode: "", checkInDate: "", checkOutDate: "" },
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

  
  const handleSearch = async (event) => {
    event.preventDefault();
  
    for (const hotel of hotels) {
      let hotelIds = [];
      let urlFormatHotelIds = '';
      const { cityCode, checkInDate, checkOutDate } = hotel;
  
      fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${travel_token}`,
        }
       })
        .then(response => response.json())
        .then(data => {
            const hotelsInLocation = data["data"];
            hotelsInLocation.forEach(item => {
                hotelIds.push(item["hotelId"])
            })
            urlFormatHotelIds = hotelIds.join('%2C')
            return fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${urlFormatHotelIds}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${guests}&bestRateOnly=true`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${travel_token}`,
                }
            });
        })
        .then(response => response.json())
        .then(data => {
            // Handle the data from the second request
            hotelOffers.push(data["data"]);
            console.log(hotelOffers)
          })
        .catch(error => console.error('Error:', error));
    }
  };

  return (

    <div className="search-div">

            <form onSubmit={handleSearch}>
            {hotels.map((hotel) => (

                    <div key={hotel.id} className="search-form">

                        <div className="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>Location:</label>
                            <input
                                type="text"
                                value={hotel.cityCode}
                                onChange={(event) =>
                                handleHotelChange(hotel.id, "cityCode", event.target.value)
                                }
                            />
                        </div>

                        <div className="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>Check-in Date:</label>
                            <input
                                type="date"
                                value={hotel.checkInDate}
                                onChange={(event) =>
                                handleHotelChange(hotel.id, "checkInDate", event.target.value)
                                }
                            />
                        </div>

                        <div className="search-input">
                            <label style={{color: 'white', fontSize: '1.3rem'}}>Check-out Date:</label>
                            <input
                                type="date"
                                value={hotel.checkOutDate}
                                onChange={(event) =>
                                handleHotelChange(hotel.id, "checkOutDate", event.target.value)
                                }
                            />
                        </div>

                        <div className="search-input">
                            <p className="label" style={{color: 'white', fontSize: '1.3rem'}}>Guests</p>
                            <select name="guests" value={guests} onChange={(event) => setGuests(event.target.value)}>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            </select>
                        </div>

                        <button type="button" onClick={() => handleDeleteHotel(hotel.id)} className="deleteButton">
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

  );
};

export default HotelSearchBar;

//fetch(`https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=HYATLJ12%2CYZATLB21&adults=1&checkInDate=2023-04-22&bestRateOnly=true`, {