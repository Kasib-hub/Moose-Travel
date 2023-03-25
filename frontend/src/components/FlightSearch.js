import { useEffect } from "react";

function FlightSearch() {

    const API_KEY = "HSiSxHpuKA14AG9GKbQgC6cexT9mfaC9"
    const SECRET_KEY = "G9eTXhzEmSjKNTLu"
    const travel_token = "4AM4EPO0A0odXqigBrSaPQGws97D"


    useEffect(() => {
        findMultiFlight();
      }, []);

   
    //====================================================================
    
      //get single flight (one way only has 'departureDate')
      const findSingleFlight = async() => {
        fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2023-03-20&adults=1`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${travel_token}`
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => console.error(error));
      }

    
    //====================================================================

        //multi-trip search (The API lets you search for up to six origin and destination city pairs)
        const findMultiFlight = async() => {
            fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers `, {
                method: `POST`,
                headers: {
                    'Authorization': `Bearer ${travel_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "originDestinations": [
                        {
                            "id": "1",
                            "originLocationCode": "MAD",
                            "destinationLocationCode": "PAR",
                            "departureDateTimeRange": {
                                "date": "2023-04-01"
                            }
                        },
                        {
                            "id": "2",
                            "originLocationCode": "PAR",
                            "destinationLocationCode": "MUC",
                            "departureDateTimeRange": {
                                "date": "2023-04-04"
                            }
                        },
                        {
                            "id": "3",
                            "originLocationCode": "MUC",
                            "destinationLocationCode": "AMS",
                            "departureDateTimeRange": {
                                "date": "2023-04-07"
                            }
                        },
                        {
                            "id": "4",
                            "originLocationCode": "AMS",
                            "destinationLocationCode": "MAD",
                            "departureDateTimeRange": {
                                "date": "2023-04-10"
                            }
                        }
                    ],
                    "travelers": [
                        {
                            "id": "1",
                            "travelerType": "ADULT",
                            "fareOptions": [
                                "STANDARD"
                            ]
                        }
                    ],
                    "sources": [
                        "GDS"
                    ],
                    "searchCriteria": {
                        "maxFlightOffers": 1
                    }
                })
                
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
              })
            .catch(error => console.error(error));
        }  

    return (
        <>
        </>
    )

}

export default FlightSearch;