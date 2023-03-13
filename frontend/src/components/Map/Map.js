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

  return (
    <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
      <MarkerF position={center} />
    </GoogleMap>
  );
}
