import React, { useState, useContext } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { useParams } from "react-router-dom"
import AuthContext from '../context/AuthContext';
import { createSight } from "../api/Sight/Sight";

export default function App({ ChangeRoute }) {

    let { user, authTokens } = useContext(AuthContext);
    let { itineraryID } = useParams();
    const [sitesToSubmit, setSitesToSubmit] = useState([]);

    const [address, setAddress] = React.useState("");
    // const [coordinates, setCoordinates] = React.useState({
    //     lat: null,
    //     lng: null
    // });

    

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        // setAddress(value);
        // setCoordinates(latLng);
        console.log("lat Long: ");
        console.log(latLng);
        const newSiteObject = {
            "user_id" : user.user_id,
            "itinerary_id" : itineraryID,
            "sight_name" : value, 
            "lat": latLng["lat"],
            "long": latLng["lng"],
        }
        setSitesToSubmit([...sitesToSubmit, newSiteObject]);
        // console.log("Sites to Submit");
        // console.log(sitesToSubmit);
    };


    const handleRemove = (index) => {
        const newList = sitesToSubmit.filter((_, i) => i !== index);
        setSitesToSubmit(newList);
      };


    const submitActivitiesToBackend = () => {
        sitesToSubmit.forEach((siteObject) => {
            createSight(authTokens.access, siteObject, itineraryID);
        });

        ChangeRoute()
        
    };


    return (
        <div>
        <h1>Choose some sites you already have planned on your trip!</h1>
        <br/>
        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                {/* <p>Latitude: {coordinates.lat}</p>
                <p>Longitude: {coordinates.lng}</p> */}

                <input {...getInputProps({ placeholder: "Type address" })} />

                <div>
                {loading ? <div>...loading</div> : null}

                {suggestions.map(suggestion => {
                    const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                    };

                    return (
                    <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                    </div>
                    );
                })}
                </div>
            </div>
            )}
        </PlacesAutocomplete>
        <br />

        {/* Conditionally render siteList */}
        {sitesToSubmit.length !== 0 && (
            <div>
            <h2>Here is what you have chosen so far: </h2>
            {sitesToSubmit.map((site, index) => (
                <div key={index}>
                <p>{site.sight_name}</p>
                <button onClick={() => handleRemove(index)}>Remove</button>
                </div>
            ))}
            </div>
        )}

        <p>---------------------------------</p>

        <button onClick={() => submitActivitiesToBackend()}>Next</button>

        </div>
    );
}