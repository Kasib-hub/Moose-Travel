import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import AuthContext from '../context/AuthContext';
import { createHotel } from "../api/Hotel/Hotel";
import { Autocomplete } from "@react-google-maps/api";
import HotelSearchBarCSS from './HotelSearchBar.module.css'
import FormSelect from "react-bootstrap/esm/FormSelect";
import Alert from 'react-bootstrap/Alert';
import Moose from '../assets/moose.svg';


const HotelSearchBar = ({ChangeRoute}) => {

    let { amadeusToken } = useContext(AuthContext);
    let { user, authTokens } = useContext(AuthContext);
    let { itineraryID } = useParams();
    const [hotelOffers, setHotelOffers] = useState(null);
    const [guests, setGuests] = useState(1);
    const [hotelsToSubmit, setHotelsToSubmit] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)

    const options = {
      types:['airport']
    }

    useEffect(() => {
      setLoading(false)
    }, [hotelOffers])

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
    setLoading(true)
    let promises = [];
    let returnedOffers = [];
  
    for (const hotel of hotels) {
      let hotelIds = [];
      let urlFormatHotelIds = "";
      const { cityCode, checkInDate, checkOutDate } = hotel;
      if (new Date(checkInDate) > new Date(checkOutDate)) {
        setError("Check out date must be after check in date");
        return;
      }
      if (cityCode.length !== 3) {
        setError("Please choose a valid city with airport that contains a 3 letter IATA code in parenthesis");
        return;
      }
      const datenow = new Date();
      if (new Date(checkInDate) < datenow || new Date(checkOutDate) <= datenow) {
        setError("Check in and check out dates must be in the future");
        return;
      }
      
  
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

  const handleBlur = (event, id) => {
    let regex = /\((.*?)\)/g
    let iataCodeWithParenthesis = event.target.value.match(regex)
    let iataCode = iataCodeWithParenthesis[0].replace(/\(|\)/g, "")
    handleHotelChange(id, "cityCode", iataCode)
  }


  return (

    <div>
        <div className="search-div">
        {error && (
          <Alert key="danger" variant="danger">
            <h3>Error:</h3>
            <pre>{error}</pre>
          </Alert>
        )}
            <form onSubmit={handleSearch} >
            {hotels.map((hotel) => (
              

                    <div key={hotel.id} className={HotelSearchBarCSS.hotelSearch}>
                        <div className="search-boxes">
                          <div className="search-input">
                              <label className="label" >Check-in Date:</label>
                              <input
                                  type="date"
                                  value={hotel.checkInDate}
                                  onChange={(event) =>
                                  handleHotelChange(hotel.id, "checkInDate", event.target.value)
                                  }
                                  required
                              />
                              <label className="label" >Check-out Date:</label>
                              <input
                                  type="date"
                                  value={hotel.checkOutDate}
                                  onChange={(event) =>
                                  handleHotelChange(hotel.id, "checkOutDate", event.target.value)
                                  }
                                  required
                              />
                          </div>

                          <div className="search-input">
                          <label className="label" >Location:</label>
                          <Autocomplete options={options}>
                            <input
                              type="text"
                              value={hotel.cityCode}
                              onBlur={(event) => handleBlur(event, hotel.id)}
                              onChange={(event) =>
                              handleHotelChange(hotel.id, "cityCode", event.target.value)
                              }
                              required
                            />
                          </Autocomplete>
                              
                              <p className="label" >Guests</p>
                              <FormSelect name="guests" value={guests} onChange={(event) => setGuests(event.target.value)}>
                              <option value="1">1 Guest</option>
                              <option value="2">2 Guests</option>
                              <option value="3">3 Guests</option>
                              <option value="4">4 Guests</option>
                              </FormSelect>
                          </div>
                        </div>
                        
                        <div className="search-boxes">
                        <button type="button" onClick={handleAddHotel} className="detail-btn">
                            Add Hotel
                        </button>
                        <button type="button" onClick={() => handleDeleteHotel(hotel.id)} className="other-btn">
                            Delete Hotel
                        </button>
                        </div>
                       

                    </div>
            ))}

            <button type="submit" className='submit-btn'>Search</button>
            </form>
        </div>
        {loading && <img src={Moose} alt="loading" className='loading'/>}
        {hotelOffers && hotelOffers.map((hotel, index) => (
            <div key={index} className="hotelListingDiv">
                <h2>{"Hotels for " + hotel["0"]["hotel"]["cityCode"]}</h2>
                {hotel.map((offer, index) => (
                    <form key={index} onSubmit={(e) =>  {
                      e.preventDefault();
                      backendReadableConversion([offer]);
                    }} className='search-form'>
                        <b>{offer["hotel"]["name"]}</b>
                        <p>{offer["offers"]["0"]["price"]["total"]}</p>
                        <button type="submit" className="other-btn">Save Hotel</button><br></br>
                    </form>
                ))}
                <p>--------------------------------</p>
            </div>
        ))}

        <button onClick={ () => submitHotelsToBackend() } className='submit-btn'>Submit Hotels</button>
        <p><strong>Hotels Selected:</strong></p>
        {hotelsToSubmit && hotelsToSubmit.map((hotel, index) => {
          return (
            <div key={index}>
              <p>{hotel.hotel_name}</p>
            </div>
          )
        })}

    </div>

  );
};

export default HotelSearchBar;
