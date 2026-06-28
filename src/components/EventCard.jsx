import { Link } from "react-router";
import { CalendarDays, MapPin } from "lucide-react";

const getCategory = (event) => {
  const text = `${event.title} ${event.description}`.toLowerCase();

  if (text.includes("dance")) return "Dancing";
  if (text.includes("swim")) return "Swimming";
  if (text.includes("cycl")) return "Cycling";
  if (text.includes("run")) return "Running";
  if (text.includes("carnival")) return "Festival";

  return "Event";
};

const EventCard = ({ event, isDarkTheme }) => {
  const category = getCategory(event);

  return (
    <Link to={`/events/${event.id}`}>
      <article
        className={
          isDarkTheme
            ? "flex h-full flex-col justify-between rounded-2xl border border-[#4a4038] bg-[#2c2521] p-4 shadow-sm shadow-black/30 transition-all hover:-translate-y-1 hover:shadow-lg"
            : "flex h-full flex-col justify-between rounded-2xl border border-[#d9c9cc] bg-[#f4ecec] p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
        }
      >
        <div>
          <h2
            className={
              isDarkTheme
                ? "mb-3 text-xl font-semibold text-[#efe3d7]"
                : "mb-3 text-xl font-semibold text-stone-700"
            }
          >
            {event.title}
          </h2>

          <span
          className={
            isDarkTheme
            ? "mb-4 inline-block rounded-full dark:bg-rose-800/10 px-2.5 py-1 text-xs font-medium dark:text-rose-300/100"
            : "mb-4 inline-block rounded-full bg-rose-100/70 px-2.5 py-1 text-xs font-medium text-rose-800/90"
            }
          >
            {category}
          </span>

          <p
            className={
              isDarkTheme
                ? "mb-6 text-[#cfc1b4]"
                : "mb-6 text-stone-600"
            }
          >
            {event.description}
          </p>
        </div>

        <div
          className={
            isDarkTheme
              ? "mt-auto flex items-center justify-between gap-4 text-sm text-stone-400"
              : "mt-auto flex items-center justify-between gap-4 text-sm text-stone-500"
          }
        >
          <div className="flex items-center gap-1.5">
            <CalendarDays size={16} />

            <span>
              {new Date(event.date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin size={16} />

            <span>{event.location}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default EventCard;