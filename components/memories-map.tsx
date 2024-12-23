"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function MemoryMap({ memories }: { memories: any[] }) {
  return (
    <MapContainer style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {memories.map(
        (memory) =>
          memory.latitude &&
          memory.longitude && (
            <Marker
              key={memory.id}
              position={[memory.latitude, memory.longitude]}
            >
              <Popup>
                <h3 className="font-bold">{memory.title}</h3>
                <p>{memory.description}</p>
                <p className="text-xs text-gray-500">
                  Kategoria: {memory.category}
                </p>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
}
