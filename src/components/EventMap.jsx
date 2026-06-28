import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const EventMap = ({ events, isDarkTheme }) => {
    return (
    <section className={
        isDarkTheme
        ? "mb-8 overflow-hidden rounded-2xl border border-[#4a4038]"
        : "mb-8 overflow-hidden rounded-2xl border border-stone-200 shadow-sm"
    }
    >
        <MapContainer
        center={[52.52, 13.405]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-96 w-full"
        >
            <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url={
                isDarkTheme
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            }
            />
            
            {events.map((event) => (
                <Marker
                key={event.id}
                position={[event.latitude, event.longitude]}
                >
                    <Popup>
                        <strong>{event.title}</strong>
                        <br />
                        {event.location}
                        </Popup>
                        </Marker>
                    ))}
        </MapContainer>
    </section>
    );
};

export default EventMap;