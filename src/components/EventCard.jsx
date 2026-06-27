import { Link } from "react-router";

const EventCard = ({ event }) => {
    return (
    <Link to={`/events/${event.id}`}>
        <article className="h-full rounded-2xl border border-stone-200 bg-[#f6fafa] shadow-sm p-4 shadow-sm hover:shadow-md transition-shadow
        transition-all hover:-translate-y-1 hover:shadow-lg">
            <h2 className="mb-2 text-1xl font-semibold">
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