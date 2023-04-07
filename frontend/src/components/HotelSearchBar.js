import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import AuthContext from '../context/AuthContext';
import { createHotel } from "../api/Hotel/Hotel";


const HotelSearchBar = ({ChangeRoute}) => {

    let { amadeusToken } = useContext(AuthContext);
    let { user, authTokens } = useContext(AuthContext);
    let { itineraryID } = useParams();
    const [hotelOffers, setHotelOffers] = useState(null);
    const [guests, setGuests] = useState(1);
    const [hotelsToSubmit, setHotelsToSubmit] = useState([]);


    useEffect(() => {

    }, [])

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

  
//   we're creating an array of promises, one for each hotel in the hotels array. We're then using Promise.all() to wait 
//   for all the promises to resolve before updating the hotelOffers state with the returnedOffers array that contains the 
//   fetched data for each hotel.
  const handleSearch = async (event) => {
    event.preventDefault();
    let promises = [];
    let returnedOffers = [];
  
    for (const hotel of hotels) {
      let hotelIds = [];
      let urlFormatHotelIds = "";
      const { cityCode, checkInDate, checkOutDate } = hotel;
  
      const fetchPromise = fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${ amadeusToken }`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const hotelsInLocation = data["data"];
          hotelsInLocation.forEach((item) => {
            hotelIds.push(item["hotelId"]);
          });
          urlFormatHotelIds = hotelIds.join("%2C");
          return fetch(
            `https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=${urlFormatHotelIds}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=${guests}&bestRateOnly=true`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${amadeusToken}`,
              },
            }
          );
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(`Offers for: ${cityCode}`);
          console.log(data["data"]);
          returnedOffers.push(data["data"]);
        })
        .catch((error) => console.error("Error:", error));
      promises.push(fetchPromise);
    }
    Promise.all(promises).then(() => setHotelOffers(returnedOffers));
  };

  const backendReadableConversion = (hotel) => {
    hotel.map((originalHotel) => {
      let convertedHotel = {
        "user_id" : user.user_id,
        "itinerary_id" : itineraryID,
        "hotel_name" : originalHotel.hotel.name,
        "location" : originalHotel.hotel.cityCode,
        "check_in_date" : originalHotel.offers["0"]["checkInDate"],
        "check_out_date" : originalHotel.offers["0"]["checkOutDate"],
      };
      return setHotelsToSubmit([...hotelsToSubmit, convertedHotel]);
    });
    console.log("Hotels to Submit");
    console.log(hotelsToSubmit);
    
  }
  
  const submitHotelsToBackend = () => {
    hotelsToSubmit.forEach((hotelObject) => {
      createHotel(authTokens.access, hotelObject, itineraryID);
      
    });
    ChangeRoute()
  };


  return (

    <div>
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

        {hotelOffers && hotelOffers.map((hotel, index) => (
            <div key={index} className="hotelListingDiv">
                <h2>{"Hotels for " + hotel["0"]["hotel"]["cityCode"]}</h2>
                {hotel.map((offer, index) => (
                    <form key={index} onSubmit={(e) =>  {
                      e.preventDefault();
                      backendReadableConversion([offer]);
                    }}>
                        <b>{offer["hotel"]["name"]}</b>
                        <p>{offer["offers"]["0"]["price"]["total"]}</p>
                        <button type="submit">Save Hotel</button>
                    </form>
                ))}
                <p>--------------------------------</p>
            </div>
        ))}

        <button onClick={ () => submitHotelsToBackend() }>Submit Hotels</button>

    </div>

  );
};

export default HotelSearchBar;
