import React from "react";
import "./Map.css";
import { TileLayer, MapContainer, useMap } from "react-leaflet";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  return (
    <div
      className={`map ${casesType === "recovered" && "green"} 
      ${casesType === "deaths" && "gray"}`}
    >
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
}

export default Map;
