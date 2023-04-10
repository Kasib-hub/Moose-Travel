import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const sites = [  //Change to get the sites on the itinerary
 
];

const Map = () => {
  useEffect(() => {
    const loader = new Loader({
      apiKey: "YOUR_API_KEY",
      version: "weekly",
      libraries: ["places"],
    });

    loader.load(() => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 10,
      });

      sites.forEach((site) => {
        const marker = new google.maps.Marker({
          position: { lat: site.lat, lng: site.long },
          map: map,
          title: site.name,
        });
      });
    });
  }, []);

  return <div id="map" style={{ height: "400px" }}></div>;
};

export default Map;
