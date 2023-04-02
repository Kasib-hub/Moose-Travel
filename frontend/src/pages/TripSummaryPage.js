import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { getItineraryByID } from "../api/Itinerary/Itinerary"
import { getAllFlightsByItinerary } from "../api/Flight/Flight"
import { getAllHotelsByItinerary } from "../api/Hotel/Hotel"
import ItineraryDisplay from "../components/TripSummary/ItineraryDisplay"
import FlightDisplay from "../components/TripSummary/FlightDisplay"
import './TripSummaryPage.css'

function TripSummaryPage () {

  let {itineraryID} = useParams()
  let {authTokens} = useContext(AuthContext)

  const [itinerary, setItinerary] = useState()
  const [flights, setFlights] = useState()
  const [hotels, setHotels] = useState()
  const [rentals, setRentals] = useState()
  const [affinities, setAffinities] = useState()
  const [sights, setSights] = useState()
  // goal here is to get all entries from each model that are associated
  // with the given itinarary ID
  useEffect(() => {
    const fetchItinerary = async () => {
     const fetchedItinerary = await getItineraryByID(authTokens.access, itineraryID)
     setItinerary(fetchedItinerary)
    }
    fetchItinerary()
 }, [])

  useEffect(() => {
     const fetchFlights = async () => {
      const fetchedFlights = await getAllFlightsByItinerary(authTokens.access, itineraryID)
      setFlights(fetchedFlights)
     }
     fetchFlights()
  }, [])

  useEffect(() => {
    const fetchHotels = async () => {
     const fetchedHotels = await getAllHotelsByItinerary(authTokens.access, itineraryID)
     setHotels(fetchedHotels)
    }
    fetchHotels()
 }, [])

  

  return (
    <>
      <h1>Trip Summary Page</h1><br></br>
      <div className="trip-summary">
        <div>
          <h2>Flights</h2>
         {flights && <FlightDisplay flights={flights}/>}<br></br>

          <h2>Hotels</h2>
          {
            hotels && hotels.map((hotel, idx) => {
              return(
                <div>
                  <p>{hotel.hotel_name} - {hotel.location}</p>
                </div>
              )
              
            })
          }<br></br>
          <h2>Rental Cars</h2>
          {
            hotels && hotels.map((hotel, idx) => {
              return(
                <div>
                  <p>{hotel.hotel_name} - {hotel.location}</p>
                </div>
              )
              
            })
          }<br></br>
          <h2>Activities</h2>
          {
            hotels && hotels.map((hotel, idx) => {
              return(
                <div>
                  <p>{hotel.hotel_name} - {hotel.location}</p>
                </div>
              )
              
            })
          }<br></br>
          <h2>Sights</h2>
          {
            hotels && hotels.map((hotel, idx) => {
              return(
                <div>
                  <p>{hotel.hotel_name} - {hotel.location}</p>
                </div>
              )
              
            })
          }<br></br>
        </div>
        <div>
          {itinerary && <ItineraryDisplay itinerary={itinerary}/>}
        </div>  
      </div>
    </>
    
    
    


  )

}

export default TripSummaryPage