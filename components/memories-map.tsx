"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { UpdateMemoriesSchema } from "@/db/schema/memories";
import { Icon } from "leaflet";

export default function MemoriesMap({
  memories,
}: {
  memories: UpdateMemoriesSchema[];
}) {
  return (
    <MapContainer
      center={[52.146, 21.005]}
      zoom={5}
      maxZoom={18}
      scrollWheelZoom={false}
      style={{ height: "800px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {memories.map(
        (memory) =>
          memory.latitude &&
          memory.longitude && (
            <Marker
              key={memory.id}
              icon={
                new Icon({
                  iconUrl:
                    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWxvY2F0ZS1maXhlZCI+PGxpbmUgeDE9IjIiIHgyPSI1IiB5MT0iMTIiIHkyPSIxMiIvPjxsaW5lIHgxPSIxOSIgeDI9IjIyIiB5MT0iMTIiIHkyPSIxMiIvPjxsaW5lIHgxPSIxMiIgeDI9IjEyIiB5MT0iMiIgeTI9IjUiLz48bGluZSB4MT0iMTIiIHgyPSIxMiIgeTE9IjE5IiB5Mj0iMjIiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSI3Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjwvc3ZnPg==",
                  iconSize: [24, 24],
                  iconAnchor: [12, 24],
                })
              }
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
