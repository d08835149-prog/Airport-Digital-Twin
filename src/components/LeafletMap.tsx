"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const airportIcon = L.divIcon({
  className: "",
  html: '<div style="font-size: 32px;">✈️</div>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function LeafletMap() {
  const pearsonAirport: [number, number] = [43.6777, -79.6248];

  return (
    <MapContainer
      center={pearsonAirport}
      zoom={14}
      scrollWheelZoom={true}
      className="h-[600px] w-full"
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={pearsonAirport} icon={airportIcon}>
        <Popup>Toronto Pearson International Airport</Popup>
      </Marker>
    </MapContainer>
  );
}