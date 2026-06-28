import { useEffect, useState } from "react";

import EventCard from "../components/EventCard";

import EventMap from "../components/EventMap";

const HomePage = ({ isDarkTheme }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/events"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const data = await response.json();

        console.log(data);

        setEvents(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="mb-2 text-4xl font-semibold text-stone-620">
        events
      </h1>

      <p className="mb-10 text-stone-500 italic">
        discover experiences across Europe
      </p>

      {isLoading && (
        <p className="text-lg">
          Loading events...
        </p>
      )}

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      {Array.isArray(events) && events.length > 0 && (
        <EventMap events={events} isDarkTheme={isDarkTheme}/>
      )}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.isArray(events) &&
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isDarkTheme={isDarkTheme}
            />
          ))}
      </section>
    </main>
  );
};

export default HomePage;