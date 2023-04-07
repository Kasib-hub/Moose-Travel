import { useParams } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import AuthContext from "../context/AuthContext"
import { getItineraryByID } from "../api/Itinerary/Itinerary"
import { getAllFlightsByItinerary } from "../api/Flight/Flight"
import { getAllHotelsByItinerary } from "../api/Hotel/Hotel"
import { getAllRentalsByItinerary } from "../api/Rental/Rental"
import { getAllAffinitiesByItinerary } from "../api/Affinity/Affinity"
import { getAllSightsByItinerary } from "../api/Sight/Sight"
import ItineraryDisplay from "../components/TripSummary/ItineraryDisplay"
import FlightsDisplay from "../components/TripSummary/FlightsDisplay"
import HotelsDisplay from "../components/TripSummary/HotelsDisplay"
import CarsDisplay from "../components/TripSummary/CarsDisplay"
import AffinitiesDisplay from "../components/TripSummary/AffinitiesDisplay"
import SightsDisplay from "../components/TripSummary/SightsDisplay"
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
 }, [authTokens.access, itineraryID])

  useEffect(() => {
     const fetchFlights = async () => {
      const fetchedFlights = await getAllFlightsByItinerary(authTokens.access, itineraryID)
      setFlights(fetchedFlights)
     }
     fetchFlights()
  }, [authTokens.access, itineraryID])

  useEffect(() => {
    const fetchHotels = async () => {
     const fetchedHotels = await getAllHotelsByItinerary(authTokens.access, itineraryID)
     setHotels(fetchedHotels)
    }
    fetchHotels()
 }, [authTokens.access, itineraryID])

  useEffect(() => {
    const fetchRentals = async () => {
     const fetchedRentals = await getAllRentalsByItinerary(authTokens.access, itineraryID)
     setRentals(fetchedRentals)
    }
    fetchRentals()
  }, [authTokens.access, itineraryID])

  useEffect(() => {
    const fetchAffinities = async () => {
     const fetchedAffinities = await getAllAffinitiesByItinerary(authTokens.access, itineraryID)
     setAffinities(fetchedAffinities)
    }
    fetchAffinities()
  }, [authTokens.access, itineraryID])

  useEffect(() => {
    const fetchSights = async () => {
     const fetchedSights = await getAllSightsByItinerary(authTokens.access, itineraryID)
     setSights(fetchedSights)
    }
    fetchSights()
  }, [authTokens.access, itineraryID])

  

  return (
    <>
      <h1>Trip Summary</h1><br></br>
      <div className="trip-summary">
        <div>
          <h2>Flights</h2>
          {flights && <FlightsDisplay flights={flights}/>}<br></br>

          <h2>Hotels</h2>
          {hotels && <HotelsDisplay hotels={hotels}/>}<br></br>

          <h2>Rental Cars</h2>
          {rentals && <CarsDisplay rentals={rentals}/>}<br></br>

          <h2>Affinities</h2>
          {affinities && <AffinitiesDisplay affinities={affinities}/>}<br></br>

          <h2>Sights</h2>
          {sights && <SightsDisplay sights={sights}/>}<br></br>

        </div>
        <div className="summary">
          {itinerary && <ItineraryDisplay itinerary={itinerary}/>}
        </div>  
      </div>
    </>

  )

}

export default TripSummaryPage