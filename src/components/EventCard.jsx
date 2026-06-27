import { Link } from "react-router";

const EventCard = ({ event }) => {
    return (
    <Link to={`/events/${event.id}`}>

        <article
        className="
        h-full
        rounded-2xl
        border
        border-[#d9c9cc]
        bg-[#f4ecec]
        p-4
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
        "
        >
        {/* <article className="h-full rounded-2xl border border-stone-200 bg-[#f6fafa] shadow-sm p-4 shadow-sm hover:shadow-md transition-shadow
        transition-all hover:-translate-y-1 hover:shadow-lg"> */}
            <h2 className="mb-2 text-xl font-semibold text-stone-700">
                {event.title}
            </h2>
            
            <p className="text-stone-600">
                {event.description}
            </p>
        </article>
    </Link>
    );
};

export default EventCard;