import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./sidebar.jsx";
import About from "./About.jsx";

export default function Stage1PropertySearchUI() {
  const [searchMode, setSearchMode] = useState("normal");
  const [searchType, setSearchType] = useState("property-id");
  const [inputValue, setInputValue] = useState("");
  const [locationType, setLocationType] = useState("urban");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const [mapError, setMapError] = useState(null);
  const [propertyType, setPropertyType] = useState("");
  const [registrationDateFrom, setRegistrationDateFrom] = useState("");
  const [registrationDateTo, setRegistrationDateTo] = useState("");
  const [clusteredProperties, setClusteredProperties] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [village, setVillage] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const clusterMarkersRef = useRef([]);

  const getLabel = (type = searchType) => {
    switch (type) {
      case "registration":
        return "Registration Number";
      case "owner":
        return "Owner Details";
      case "address":
        return "Address";
      default:
        return "Property ID";
    }
  };

  const fetchClusteredProperties = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/properties/clustered");
      if (!response.ok) throw new Error("Failed to fetch clustered properties");
      const data = await response.json();
      setClusteredProperties(data);
    } catch (error) {
      console.error("Error fetching clustered properties:", error);
      setMapError("Failed to load clustered properties: " + error.message);
    }
  };

  useEffect(() => {
    if (searchMode !== "location") {
      setMapLoading(false);
      setMapError(null);
      setClusteredProperties([]);
      clusterMarkersRef.current.forEach((marker) => marker.setMap(null));
      clusterMarkersRef.current = [];
      return;
    }

    fetchClusteredProperties();
    setMapLoading(true);

    if (!window.google || !window.google.maps) {
      setMapError("Google Maps API failed to load. Please check your API key and internet connection.");
      setMapLoading(false);
      return;
    }

    if (mapInstanceRef.current) {
      setMapLoading(false);
      return;
    }

    let clickListener;

    try {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: "roadmap",
      });
      mapInstanceRef.current = map;

      const input = inputRef.current;
      if (!input) {
        setMapError("Search input not found.");
        setMapLoading(false);
        return;
      }

      const searchBox = new google.maps.places.SearchBox(input);
      autocompleteRef.current = searchBox;

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (!places || places.length === 0) return;

        const place = places[0];
        if (!place.geometry || !place.geometry.location) return;

        map.setCenter(place.geometry.location);
        if (markerRef.current) markerRef.current.setMap(null);

        markerRef.current = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
        });

        setSelectedLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          address: place.formatted_address || "Selected Location",
        });
        setInputValue(place.formatted_address || "Selected Location");
      });

      clickListener = map.addListener("click", (event) => {
        const latLng = event.latLng;
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location: latLng }, (results, status) => {
          if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            setSelectedLocation({
              lat: latLng.lat(),
              lng: latLng.lng(),
              address: address,
            });
            setInputValue(address);

            if (markerRef.current) markerRef.current.setMap(null);
            markerRef.current = new google.maps.Marker({
              position: latLng,
              map: map,
            });
          } else {
            console.error("Geocoder failed due to: " + status);
          }
        });
      });

      setMapLoading(false);
    } catch (error) {
      setMapError("Failed to initialize map: " + error.message);
      setMapLoading(false);
    }

    return () => {
      if (clickListener) {
        google.maps.event.removeListener(clickListener);
      }
      if (autocompleteRef.current) {
 исследованиеmaps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
      if (mapInstanceRef.current) {
        google.maps.event.clearInstanceListeners(mapInstanceRef.current);
        mapInstanceRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.setMap(null);
        markerRef.current = null;
      }
      clusterMarkersRef.current.forEach((marker) => marker.setMap(null));
      clusterMarkersRef.current = [];
    };
  }, [searchMode]);

  useEffect(() => {
    if (searchMode !== "location" || !mapInstanceRef.current || !clusteredProperties.length) return;

    clusterMarkersRef.current.forEach((marker) => marker.setMap(null));
    clusterMarkersRef.current = [];

    clusteredProperties.forEach((property) => {
      if (property.lat && property.lng) {
        const marker = new google.maps.Marker({
          position: { lat: property.lat, lng: property.lng },
          map: mapInstanceRef.current,
          title: property.propertyid || "Property",
        });
        clusterMarkersRef.current.push(marker);
      }
    });
  }, [clusteredProperties, searchMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (searchMode === "normal") {
        const payload = {
          owner_name: ownerName,
          propertyid: propertyId,
          district,
          taluka,
          village,
          registration_number: registrationNumber,
        };

        const response = await fetch("http://localhost:5000/api/properties/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to submit property data");
        const result = await response.json();
        console.log("Property submitted successfully:", result);
        handleClear();
      } else {
        console.log({
          searchMode,
          locationType,
          selectedLocation,
        });
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      setMapError("Failed to submit property: " + error.message);
    }
  };

  const handleClear = () => {
    setSearchType("property-id");
    setInputValue("");
    setLocationType("urban");
    setSelectedLocation(null);
    setPropertyType("");
    setRegistrationDateFrom("");
    setRegistrationDateTo("");
    setOwnerName("");
    setPropertyId("");
    setDistrict("");
    setTaluka("");
    setVillage("");
    setRegistrationNumber("");
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null;
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 font-sans flex flex-col items-center">
        <header className="flex justify-center items-center mb-10 w-full max-w-5xl">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-indigo-700 drop-shadow-lg mb-2">
              Unified Property Search Portal
            </h1>
            <p className="text-gray-600 text-lg">Search properties easily by ID, owner, address, or location</p>
          </div>
        </header>

        <Sidebar />

        <div className="w-full max-w-5xl mt-6 flex flex-col items-center mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="flex justify-center mb-8 w-full">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-medium text-indigo-700">Search Mode:</span>
                      <div
                        onClick={() => setSearchMode(searchMode === "normal" ? "location" : "normal")}
                        className="relative inline-flex items-center w-[320px] h-14 bg-gray-100 rounded-full cursor-pointer border border-gray-300 shadow-inner transition-all duration-300 ease-in-out"
                      >
                        <div
                          className={`absolute top-1 left-1 h-12 w-36 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-md transform transition-transform duration-300 ease-in-out ${
                            searchMode === "location" ? "translate-x-[136px]" : "translate-x-0"
                          }`}
                        ></div>
                        <div className="flex justify-between items-center w-full px-6 z-10 font-semibold text-base">
                          <span className={searchMode === "normal" ? "text-white" : "text-gray-600"}>🔍 Normal Search</span>
                          <span className={searchMode === "location" ? "text-white" : "text-gray-600"}>📍 Location-Based</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mb-8 w-full">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-medium text-indigo-700">Location Type:</span>
                      <div
                        onClick={() => setLocationType(locationType === "urban" ? "rural" : "urban")}
                        className="relative inline-flex items-center w-48 h-12 bg-gray-200 rounded-full cursor-pointer border border-gray-300 shadow-md"
                      >
                        <div
                          className="absolute top-1 left-1 w-24 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-transform duration-300 ease-in-out shadow-md"
                          style={{ transform: locationType === "urban" ? "translateX(92px)" : "translateX(0)" }}
                        ></div>
                        <div className="flex justify-between w-full px-4 text-base font-semibold text-gray-700 z-10">
                          <span className={locationType === "rural" ? "text-white" : "text-gray-500"}>Rural</span>
                          <span className={locationType === "urban" ? "text-white" : "text-gray-500"}>Urban</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {searchMode === "normal" && (
                    <form className="max-w-md mx-auto p-4 bg-white rounded shadow" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        placeholder="Owner Name"
                        className="w-full mb-3 p-2 border rounded"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Property ID"
                        className="w-full mb-3 p-2 border rounded"
                        value={propertyId}
                        onChange={(e) => setPropertyId(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="District"
                        className="w-full mb-3 p-2 border rounded"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Taluka"
                        className="w-full mb-3 p-2 border rounded"
                        value={taluka}
                        onChange={(e) => setTaluka(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Village"
                        className="w-full mb-3 p-2 border rounded"
                        value={village}
                        onChange={(e) => setVillage(e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Registration Number"
                        className="w-full mb-3 p-2 border rounded"
                        value={registrationNumber}
                        onChange={(e) => setRegistrationNumber(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        onClick={handleClear}
                        className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                      >
                        Clear
                      </button>
                    </form>
                  )}

                  {searchMode === "location" && (
                    <div className="w-full max-w-md">
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for a location"
                        className="w-full p-2 border rounded mb-4"
                      />
                      <div
                        ref={mapRef}
                        className="w-full h-96 border rounded"
                      ></div>
                      {mapLoading && <p className="text-gray-600 mt-2">Loading map...</p>}
                      {mapError && <p className="text-red-500 mt-2">{mapError}</p>}
                      <button
                        type="button"
                        onClick={handleClear}
                        className="w-full mt-4 bg-gray-300 text-gray-700 py-2 rounded hover:bg-gray-400"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<div>Services Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}