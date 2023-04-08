import { useParams } from "react-router-dom"
import AuthContext from "../context/AuthContext"
import { useEffect, useState, useContext } from "react"
import { getAllFlightsByItinerary } from "../api/Flight/Flight"
import { getAllHotelsByItinerary } from "../api/Hotel/Hotel"
// import { getAllRentalsByItinerary } from "../api/Rental/Rental"
// import { getAllAffinitiesByItinerary } from "../api/Affinity/Affinity"
import { getItineraryByID, editItinerary} from '../api/Itinerary/Itinerary';



function ChatGPTSummaryRequest ({ likes }) {

    let {itineraryID} = useParams()
    let {user, authTokens} = useContext(AuthContext)
    const apiKey = "1234";
  
    const [itinerary, setItinerary] = useState()
    const [flights, setFlights] = useState()
    const [hotels, setHotels] = useState()
    const [summary, setSummary] = useState()
    // const [rentals, setRentals] = useState()
    // const [affinities, setAffinities] = useState()
    // const [sights, setSights] = useState()

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
    }, [flights, hotels, likes])

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

    }, [summary, authTokens.access, itinerary.itinerary_name, itineraryID, user.user_id])



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






// import { useParams } from "react-router-dom"
// import AuthContext from "../context/AuthContext"
// import { useEffect, useContext } from "react"
// import { getAllFlightsByItinerary } from "../api/Flight/Flight"
// import { getAllHotelsByItinerary } from "../api/Hotel/Hotel"
// import { getItineraryByID, editItinerary} from '../api/Itinerary/Itinerary';
// import { getAllSightsByItinerary } from "../api/Sight/Sight"

// async function ChatGPTSummaryRequest ({ likes = 'indifferent' } = {}) {

//     let {itineraryID} = useParams()
//     let {user, authTokens} = useContext(AuthContext)
//     const apiKey = "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"


//     //When authTokens.access and itineraryID change, we do the following:
//     useEffect(() => {

//         let summary = "";

//         //Get the itenerary 
//         const fetchItinerary = async () => {
//             const fetchedItinerary = await getItineraryByID(authTokens.access, itineraryID)
//             return fetchedItinerary
//         }

//         //Get the flights
//         const fetchFlights = async () => {
//             const fetchedFlights = await getAllFlightsByItinerary(authTokens.access, itineraryID)
//             return fetchedFlights
//         }

//         //Get the hotels
//         const fetchHotels = async () => {
//             const fetchedHotels = await getAllHotelsByItinerary(authTokens.access, itineraryID)
//             return fetchedHotels
//         }

//         //Get the sites
//         const fetchSites = async () => {
//             const fetchedSights = await getAllSightsByItinerary(authTokens.access, itineraryID)
//             return fetchedSights
//         }

//         // const fetchRentals = async () => {
//         // const fetchedRentals = await getAllRentalsByItinerary(authTokens.access, itineraryID)
//         // setRentals(fetchedRentals)
//         // }
//         // fetchRentals()

//         // Convert the flights to a readble string 
//         const flightStringToSend = (flights) => {
//             if (flights == null) {
//                 return "None";
//             } else {
//                 const flightStrings = flights.map(flight =>
//                     Object.entries(flight)
//                       .filter(([key, value]) => key !== "price") // exclude price key
//                       .slice(1, 6) // select remaining keys and values
//                       .map(([key, value]) => `${key}:${value}`).join(',')
//                   );
                
//                   const flightStingToSend = flightStrings.join('/');
//                   return flightStingToSend;
//             }
            
//         }
    
    
//         //Convert the hotels to a readble string 
//         const hotelStringToSend = (hotels) => {
//             if (hotels == null) {
//                 return "None";
//             } else {
//                 const hotelStrings = hotels.map(hotel =>
//                     Object.entries(hotel)
//                     .slice(1, -2)
//                     .map(([key, value]) => `${key}:${value}`).join(',') 
//                 );
//                 const hotelStingToSend = hotelStrings.join('/')
//                 return hotelStingToSend;
//             }
            
//         }
    
//         //Convert the sites to a readble string 
//         const siteStringToSend = (sites) => {
//             if (sites == null) {;
//                 return "None"
//             } else {
//                 const siteStrings = []
//                 sites.map(site =>
//                     siteStrings.push(site.sight_name)
//                 )
//                 const siteStingToSend = siteStrings.join('/')
//                 return siteStingToSend
//             }
//         }

//         //get a summary made by ChatGPT
//         const getSummary = async () => {
//             const prompt = `I am going on a trip. Use the following information to create an itinerary. Only respond with the itenerary and  call places only by their names (not iata codes). Flights:${flightStringToSend(fetchFlights())}; Hotels:${hotelStringToSend(fetchHotels())}; These are the things I like do when I travel: ${ likes }; These are specific sites I must see: ${siteStringToSend(fetchSites())}`;
//             console.log(likes)
//             const requestOptions = {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${apiKey}`,
//               },
//               body: JSON.stringify({
//                 model: "gpt-3.5-turbo",
//                 messages: [{ role: "user", content: `${prompt}` }],
//               }),
//             };
//             try {
//               const response = await fetch("https://api.openai.com/v1/chat/completions",requestOptions);
//               const jsonresponse = await response.json();
//               return jsonresponse.choices["0"].message.content;
//             } catch (error) {
//                 console.error(error);
//             }
//         };


//         // Edit Itinerary
//         const addSummaryItinerary = async () => {
//             const itineraryToUse = await fetchItinerary();
//             const data = {
//                 "itinerary_name": itineraryToUse.itinerary_name,
//                 "user_id": user.user_id,
//                 "summary": await getSummary(),
//             }
//             const fixedItinerary = await editItinerary(authTokens.access, data, itineraryID)
//             console.log("Edited Itinerary:")
//             console.log(fixedItinerary)
//         }

//         const fetchData = async () => {
//             await addSummaryItinerary();
//         };

//     // Call fetchData() and wait for it to complete
//     fetchData();

//     }, [])


//     return (

//         <div>

//         </div>


//     )

// }

// export default ChatGPTSummaryRequest



