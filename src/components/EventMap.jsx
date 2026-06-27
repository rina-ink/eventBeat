import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const EventMap = ({ events }) => {
    return (
    <section className="mb-8 overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
        <MapContainer
        center={[52.52, 13.405]}
        zoom={4}
        scrollWheelZoom={false}
        className="h-96 w-full"
        >
            <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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