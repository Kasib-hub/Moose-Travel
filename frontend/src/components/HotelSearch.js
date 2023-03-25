import { useEffect } from "react";

function HotelSearch() {

    const API_KEY = "HSiSxHpuKA14AG9GKbQgC6cexT9mfaC9"
    const SECRET_KEY = "G9eTXhzEmSjKNTLu"
    const travel_token = "cPwHfIc8U8k9AhnLdNUsyTJUmtvG"


    useEffect(() => {
        findHotel();
      }, []);

   
    //====================================================================
    
        //get single flight (one way only has 'departureDate')
        const findHotel = async () => {
            fetch(`https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=ATL`, {
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
       

    return (
        <>
        </>
    )

}

export default HotelSearch;