// src/components/RawGoogleMap.jsx
"use client"; // Mark this as a Client Component

import React, { useEffect, useRef, useState } from "react";

const RawGoogleMap = () => {
  const mapRef = useRef(null); // Ref to attach the map container div
  const mapInstanceRef = useRef(null); // Ref to store the Google Map instance
  const markerInstanceRef = useRef(null); // Ref to store the Google Marker instance
  const [mapLoaded, setMapLoaded] = useState(false);

  const defaultCenter = { lat: 34.759185068880214, lng: 32.42301715699066 };
  const church = { lat: 34.77276246184863, lng:  32.42073353361605, label: "Church" };
  const hotel = { lat: 34.74436, lng: 32.43494 };
  const sofos = { lat: 34.806087790732654, lng: 32.460204985843234 };
  const katerina = { lat: 34.759185068880214, lng: 32.42301715699066 };
  useEffect(() => {
    // Function to load the Google Maps API script
    const loadGoogleMapsScript = () => {
      // Check if the script is already present to avoid multiple loads
      if (document.getElementById("google-maps-script")) {
        return Promise.resolve(); // Already loaded, resolve immediately
      }

      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDD-3lJnf7T6katNLubnR7ptHdER65789k&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // We'll use a global callback function (initMap) for the script to call
      // once it's loaded and ready. This is how the Google Maps API traditionally works.
      return new Promise((resolve, reject) => {
        window.initMap = () => {
          console.log("Google Maps API script loaded!");
          setMapLoaded(true);
          resolve();
        };
        script.onerror = (error) => {
          console.error("Error loading Google Maps script:", error);
          reject(error);
        };
      });
    };

    // Load the script when the component mounts
    loadGoogleMapsScript()
      .then(() => {
        // If the script is loaded and initMap has been called, mapLoaded will be true
        // Now we can initialize the map
        if (mapRef.current && window.google && mapLoaded) {
          if (!mapInstanceRef.current) { // Prevent re-initializing if already done
            mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
              center: defaultCenter,
              zoom: 14,
              mapTypeId: window.google.maps.MapTypeId.SATELLITE,
              mapId: "YOUR_MAP_ID_OPTIONAL", // Optional: If you have custom map styles
            });

            // Add a marker
            markerInstanceRef.current = new window.google.maps.Marker({
              position: hotel,
              map: mapInstanceRef.current,
              title: "Hotel",
              label: "H",
            //   icon: {
            //     url: "https://maps.gstatic.com/mapfiles/ms2/micons/bus.png",
            //     scaledSize: new window.google.maps.Size(32, 32)
            //   }
            });

            // Add a second marker
            const secondMarker = new window.google.maps.Marker({
              position: church,
              map: mapInstanceRef.current,
              title: "Church",
              label: "C",
            //   icon: {
            //     url: "https://maps.gstatic.com/mapfiles/ms2/micons/bus.png",
            //     scaledSize: new window.google.maps.Size(32, 32)
            //   }
            });

            const thirdMarker = new window.google.maps.Marker({
                position: sofos,
                map: mapInstanceRef.current,
                title: "Sofos",
                label: "S",
            });

            const fourthMarker = new window.google.maps.Marker({
                position: katerina,
                map: mapInstanceRef.current,
                title: "Katerina",
                label: "K",
            });

            // Add a click listener to the map
            mapInstanceRef.current.addListener("click", (mapsMouseEvent) => {
              const clickedLatLng = mapsMouseEvent.latLng.toJSON();
              console.log("Map clicked at:", clickedLatLng);

              // Update marker position
              if (markerInstanceRef.current) {
                markerInstanceRef.current.setPosition(clickedLatLng);
              } else {
                // Create marker if it doesn't exist
                markerInstanceRef.current = new window.google.maps.Marker({
                  position: clickedLatLng,
                  map: mapInstanceRef.current,
                });
              }
            });
          }
        }
      })
      .catch((error) => {
        console.error("Failed to load or initialize Google Maps:", error);
      });

    // Clean up when the component unmounts
    return () => {
      // Clean up map instance if necessary
      if (mapInstanceRef.current) {
        // No specific `destroy` method for google.maps.Map,
        // but setting it to null allows garbage collection.
        mapInstanceRef.current = null;
      }
      if (markerInstanceRef.current) {
        markerInstanceRef.current.setMap(null); // Remove marker from map
        markerInstanceRef.current = null;
      }
      // Remove the global initMap callback to prevent memory leaks if not needed elsewhere
      if (window.initMap) {
          delete window.initMap;
      }
    };
  }, [mapLoaded]); // Re-run effect when mapLoaded state changes

  return (
    <div
      ref={mapRef}
      style={{ width: "100%", height: "600px", border: "1px solid #ccc" }}
    >
      {!mapLoaded && <div>Loading Google Map...</div>}
    </div>
  );
};

export default RawGoogleMap;