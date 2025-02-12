"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const markerIcon = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = () => {
  const [coordinates, setCoordinates] = useState([55.765433, 37.853596]); // Default to Moscow center

  // useEffect(() => {
  //   const provider = new OpenStreetMapProvider();

  //   provider
  //     .search({ query: "Москва, г. Реутов, ул. Победы, 20" })
  //     .then((result) => {
  //       if (result && result.length > 0) {
  //         const { x, y } = result[0];
  //         setCoordinates([y, x]);
  //       }
  //     });
  // }, []);

  return (
    <div className="mapContainer">
      <div className="mapStyle">
        <MapContainer
          center={coordinates}
          zoom={13}
          style={{ height: "100%", width: "100%", zIndex: "1" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={coordinates}>
            <Popup>Москва, г. Реутов, ул. Победы, 20</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;