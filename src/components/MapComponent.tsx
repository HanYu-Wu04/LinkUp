"use client";

import React, { useRef, useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker, Circle } from "@react-google-maps/api";

interface MapComponentProps {
  onMarkerChange: (lat: number, lng: number) => void; // Callback for marker changes
}

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const libraries: ("places" | "drawing" | "geometry" | "localContext" | "visualization")[] = ["places"];

const MapComponent: React.FC<MapComponentProps> = ({ onMarkerChange }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string, // Use .env file for API Key
  });

  const [markerPosition, setMarkerPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const mapRef = useRef<google.maps.Map | null>(null);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;

    // Center map to the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);
          setCurrentLocation(userLocation);

          // Set the map bounds to fit a 5-mile radius
          const circle = new google.maps.Circle({
            center: userLocation,
            radius: 404.72, //.25 mi radius
          });

          const bounds = circle.getBounds();
          if (bounds) {
            map.fitBounds(bounds);
          }
        },
        () => {
          console.error("Error: Unable to retrieve current location.");
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      setMarkerPosition({ lat, lng });
      onMarkerChange(lat, lng); // Call the callback with the new position
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={currentLocation || { lat: 35.270378, lng: -120.680656 }}
      zoom={10} // Fallback zoom if no current location is available
      onLoad={onMapLoad}
      onClick={handleMapClick}
    >
      {/* Marker */}
      {markerPosition && <Marker position={markerPosition} />}
    </GoogleMap>
  );
};

export default MapComponent;
