import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"
import './Map.css'

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  })

  if (!isLoaded) return <h2>Loading...</h2>
  return <MapComponent />
}

function MapComponent() {
  const center = useMemo(() => ({ lat: 57.4125, lng:-6.1960 }), [])
  const marker1 = ({lat: 57.25035, lng: -6.25831})

  return (
    <GoogleMap zoom={15} center={center} mapContainerClassName="map-container">
      {/* all a marker needs is latitude and longitude */}
      <MarkerF position={center} />
      <MarkerF position={marker1}/>
    </GoogleMap>
  );
}
