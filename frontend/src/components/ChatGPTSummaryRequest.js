import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useEffect, useState, useContext } from "react"
import { getItineraryByID } from "../api/Itinerary/Itinerary"
import { getAllFlightsByItinerary } from "../api/Flight/Flight"
import { getAllHotelsByItinerary } from "../api/Hotel/Hotel"
import { getAllRentalsByItinerary } from "../api/Rental/Rental"
import { getAllAffinitiesByItinerary } from "../api/Affinity/Affinity"
import { getAllSightsByItinerary } from "../api/Sight/Sight"


function ChatGPTSummaryRequest ({ likes }) {

    let {itineraryID} = useParams()
    let {authTokens} = useContext(AuthContext)
    const apiKey = "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";
  
    const [itinerary, setItinerary] = useState()
    const [flights, setFlights] = useState()
    const [hotels, setHotels] = useState()
    const [summary, setSummary] = useState()
    const [rentals, setRentals] = useState()
    const [affinities, setAffinities] = useState()
    const [sights, setSights] = useState()

    useEffect(() => {
        const fetchItinerary = async () => {
        const fetchedItinerary = await getItineraryByID(authTokens.access, 1)
        setItinerary(fetchedItinerary)
        }
        fetchItinerary()

        const fetchFlights = async () => {
        const fetchedFlights = await getAllFlightsByItinerary(authTokens.access, 1)
        setFlights(fetchedFlights)
        }
        fetchFlights()

        const fetchHotels = async () => {
        const fetchedHotels = await getAllHotelsByItinerary(authTokens.access, 1)
        setHotels(fetchedHotels)
        }
        fetchHotels()

        const fetchRentals = async () => {
        const fetchedRentals = await getAllRentalsByItinerary(authTokens.access, itineraryID)
        setRentals(fetchedRentals)
        }
        fetchRentals()

        const fetchAffinities = async () => {
        const fetchedAffinities = await getAllAffinitiesByItinerary(authTokens.access, itineraryID)
        setAffinities(fetchedAffinities)
        }
        fetchAffinities()

        const fetchSights = async () => {
        const fetchedSights = await getAllSightsByItinerary(authTokens.access, itineraryID)
        setSights(fetchedSights)
        }
        fetchSights()


    }, [authTokens.access, itineraryID])

    // useEffect(() => {
    //     if (flights || hotels) {
    //         getSummary()
    //     }
    // }, [flights, hotels])



    function flightStringToSend(flights) {
        if (flights == null) {
            return "None";
        } else {
            const flightStrings = flights.map(flight =>
                Object.entries(flight)
                  .filter(([key, value]) => key !== "price") // exclude price key
                  .slice(1, 6) // select remaining keys and values
                  .map(([key, value]) => `${key}:${value}`).join(',')
              );
            
              const flightStingToSend = flightStrings.join('/');
              return flightStingToSend;
        }
        
      }


    function hotelStringToSend(hotels) {
        if (hotels == null) {
            return "None";
        } else {
            const hotelStrings = hotels.map(hotel =>
                Object.entries(hotel)
                .slice(1, -2)
                .map(([key, value]) => `${key}:${value}`).join(',') 
            );
            const hotelStingToSend = hotelStrings.join('/')
            return hotelStingToSend;
        }
        
    }


    const getSummary = async() => {
        const prompt = `I am going on a trip. Use the following information to create an itinerary. Only respond with the itenerary and  call places only by their names (not iata codes). Flights:${flightStringToSend(flights)}; Hotels:${hotelStringToSend(hotels)}; These are the things I like do when I travel: ${ likes } `;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": `${prompt}`}],
            })
            };
            try {
                const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
                const data = await response.json();
                setSummary(data.choices["0"].message.content);
              } catch (error) {
                console.error(error);
              }

    }


    return (

        <div>
            {summary ? (<p>{summary}</p>) : ( <p>Summary does not exist</p>)}
        </div>


    )

}

export default ChatGPTSummaryRequest