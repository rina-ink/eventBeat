import { Link } from "react-router";

const EventCard = ({ event, isDarkTheme }) => {
  return (
    <Link to={`/events/${event.id}`}>
      <article
        className={
          isDarkTheme
            ? "h-full rounded-2xl border border-[#4a4038] bg-[#2c2521] p-4 shadow-sm shadow-black/30 transition-all hover:-translate-y-1 hover:shadow-lg"
            : "h-full rounded-2xl border border-[#d9c9cc] bg-[#f4ecec] p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        }
        >
        <h2
          className={
            isDarkTheme
              ? "mb-2 text-xl font-semibold text-[#efe3d7]"
              : "mb-2 text-xl font-semibold text-stone-700"
          }
        >
          {event.title}
        </h2>

        <p
          className={
            isDarkTheme
              ? "text-[#cfc1b4]"
              : "text-stone-600"
          }
        >
          {event.description}
        </p>
      </article>
    </Link>
  );
};

export default EventCard;