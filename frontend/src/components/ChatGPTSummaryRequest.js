import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useEffect, useState, useContext } from "react"
import { getAllFlightsByItinerary } from "../api/Flight/Flight"
import { getAllHotelsByItinerary } from "../api/Hotel/Hotel"
import { getItineraryByID, editItinerary} from '../api/Itinerary/Itinerary';

function ChatGPTSummaryRequest ({ likes }) {

    let {itineraryID} = useParams()
    let {user, authTokens} = useContext(AuthContext)
    const apiKey = process.env.REACT_APP_GPT_API_KEY
  
    const [itinerary, setItinerary] = useState()
    const [flights, setFlights] = useState()
    const [hotels, setHotels] = useState()
    const [summary, setSummary] = useState()
    useEffect(() => {
        const fetchItinerary = async () => {
        const fetchedItinerary = await getItineraryByID(authTokens.access, itineraryID)
        setItinerary(fetchedItinerary)
        }
        fetchItinerary()

        const fetchFlights = async () => {
        const fetchedFlights = await getAllFlightsByItinerary(authTokens.access, itineraryID)
        setFlights(fetchedFlights)
        }
        fetchFlights()

        const fetchHotels = async () => {
        const fetchedHotels = await getAllHotelsByItinerary(authTokens.access, itineraryID)
        setHotels(fetchedHotels)
        }
        fetchHotels()

        // const fetchRentals = async () => {
        // const fetchedRentals = await getAllRentalsByItinerary(authTokens.access, itineraryID)
        // setRentals(fetchedRentals)
        // }
        // fetchRentals()

        // const fetchAffinities = async () => {
        // const fetchedAffinities = await getAllAffinitiesByItinerary(authTokens.access, itineraryID)
        // setAffinities(fetchedAffinities)
        // }
        // fetchAffinities()

        // const fetchSights = async () => {
        // const fetchedSights = await getAllSightsByItinerary(authTokens.access, itineraryID)
        // setSights(fetchedSights)
        // }
        // fetchSights()


    }, [authTokens.access, itineraryID])

    useEffect(() => {
        if (flights || hotels) {

            const getSummary = async () => {
                const prompt = `I am going on a trip. Use the following information to create an itinerary. Only respond with the itenerary and  call places only by their names (not iata codes). Flights:${flightStringToSend(flights)}; Hotels:${hotelStringToSend(hotels)}; These are the things I like do when I travel: ${likes} `;
                console.log(likes)
                const requestOptions = {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                  },
                  body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: `${prompt}` }],
                  }),
                };
                try {
                  const response = await fetch("https://api.openai.com/v1/chat/completions",requestOptions);
                  const jsonresponse = await response.json();
                  setSummary(jsonresponse.choices["0"].message.content);
                } catch (error) {
                    console.error(error);
                }
            };

            getSummary()
        }
    }, [flights, hotels, likes, apiKey])

    useEffect(() => {

        // Edit Itinerary
        const putSummary = async () => {
            const data = {
                "itinerary_name": itinerary.itinerary_name,
                "user_id": user.user_id,
                "summary": summary,
            }
            const fixedItinerary = await editItinerary(authTokens.access, data, itineraryID)
            console.log("Edited Itinerary:")
            console.log(fixedItinerary)
        }

        putSummary()

    }, [summary, authTokens.access, itineraryID, itinerary.itinerary_name, user.user_id])



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



    return (

        <div>
            
        </div>


    )

}

export default ChatGPTSummaryRequest