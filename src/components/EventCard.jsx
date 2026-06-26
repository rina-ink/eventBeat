import { Link } from "react-router";

const EventCard = ({ event }) => {
    return (
    <Link to={`/events/${event.id}`}>
        <article className="h-full rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="mb-2 text-2xl font-semibold">
                {event.title}
            </h2>
            
            <p>
                {event.description}
            </p>
        </article>
    </Link>
    );
};

export default EventCard;