import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useEffect, useState, useContext } from "react"
import { getAllFlightsByItinerary } from "../api/Flight/Flight"
import { getAllHotelsByItinerary } from "../api/Hotel/Hotel"
import { getItineraryByID, editItinerary} from '../api/Itinerary/Itinerary';
import { getAllSightsByItinerary } from "../api/Sight/Sight"
import { getAllAffinitiesByItinerary } from "../api/Affinity/Affinity"

function ChatGPTSummaryRequest () {

    let {itineraryID} = useParams()
    let {user, authTokens} = useContext(AuthContext)
    const apiKey = "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"
  
    const [itinerary, setItinerary] = useState()
    const [flights, setFlights] = useState()
    const [sites, setSites] = useState()
    const [hotels, setHotels] = useState()
    const [summary, setSummary] = useState()
    const [affinities, setAffinities] = useState()
    const [isItineraryLoaded, setIsItineraryLoaded] = useState(false);

    //When authTokens.access and itineraryID change...
    useEffect(() => {

        //set Itinerary
        const fetchItinerary = async () => {
            const fetchedItinerary = await getItineraryByID(authTokens.access, itineraryID);
            setItinerary(fetchedItinerary);
            setIsItineraryLoaded(true);
        };
        fetchItinerary();

        //set Flights
        const fetchFlights = async () => {
        const fetchedFlights = await getAllFlightsByItinerary(authTokens.access, itineraryID)
        setFlights(fetchedFlights)
        }
        fetchFlights()

        //set Hotels
        const fetchHotels = async () => {
        const fetchedHotels = await getAllHotelsByItinerary(authTokens.access, itineraryID)
        setHotels(fetchedHotels)
        }
        fetchHotels()

        const fetchAffinities = async () => {
            const fetchedAffinities = await getAllAffinitiesByItinerary(authTokens.access, itineraryID)
            setAffinities(fetchedAffinities)
        }
        fetchAffinities();

        // const fetchRentals = async () => {
        // const fetchedRentals = await getAllRentalsByItinerary(authTokens.access, itineraryID)
        // setRentals(fetchedRentals)
        // }
        // fetchRentals()

        //set Sites
        const fetchSites = async () => {
            const fetchedSites = await getAllSightsByItinerary(authTokens.access, itineraryID)
            setSites(fetchedSites)
        }
        fetchSites()


    }, [authTokens.access, itineraryID])


    //If flights or hotels change..
    useEffect(() => {

        //if either flights or hotels exists..
        if (flights || hotels || affinities) {

            //send the request to GPT with itinerary information
            const getSummary = async () => {
                const prompt = `I am going on a trip. Use the following information to create an itinerary. Only respond with the itenerary and  call places only by their names (not iata codes). Flights:${flightStringToSend(flights)}; Hotels:${hotelStringToSend(hotels)}; These are the things I like do when I travel: ${affinityStringToSend(affinities)}; Sites I must see: ${siteStringToSend(sites)} `;
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
                  if (jsonresponse.choices && jsonresponse.choices.length > 0) {
                    console.log(jsonresponse.choices["0"].message.content);
                    setSummary(jsonresponse.choices["0"].message.content);
                }
                } catch (error) {
                    console.error(error);
                }
            };

            getSummary()
        }
    }, [flights, hotels, affinities, sites])

    //if summary changes...
    useEffect(() => {

        if (itinerary && summary && isItineraryLoaded) {
        // Edit Itinerary
        if (itinerary && summary) {
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
          }
        }
    }, [itinerary, summary])


    //Convert the flights to a readble string 
    function flightStringToSend(flights) {
        if (!flights || flights.length === 0) {
          return "None";
        } else {
          const flightStrings = flights.map(flight =>
            Object.entries(flight)
              .filter(([key, value]) => key !== "price") // exclude price key
              .slice(1, 6) // select remaining keys and values
              .map(([key, value]) => `${key}:${value}`).join(',')
          );
          const flightStringToSend = flightStrings.join('/');
          return flightStringToSend;
        }
      }


    //Convert the hotels to a readble string 
    function hotelStringToSend(hotels) {
        if (!hotels || hotels == null) {
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

    //Convert the sites to a readble string 
    const siteStringToSend = (sites) => {
        if (!sites || sites == null) {;
            return "None"
        } else {
            const siteStrings = []
            sites.map(site =>
                siteStrings.push(site.sight_name)
            )
            const siteStingToSend = siteStrings.join('/')
            return siteStingToSend
        }
    }

    //Convert the sites to a readble string 
    const affinityStringToSend = (affinities) => {
        if (!affinities|| affinities == null) {;
            return "None"
        } else {
            const affinityStrings = []
            affinities.map(affinity =>
                affinityStrings.push(affinity.affinity_type)
            )
            const affinityStingToSend = affinityStrings.join('/')
            return affinityStingToSend
        }
    }

    return (

        <div>
            {summary ? <p>{ summary }</p> : <p>Loading... (This may take some time)</p>}
        </div>


    )

}

export default ChatGPTSummaryRequest