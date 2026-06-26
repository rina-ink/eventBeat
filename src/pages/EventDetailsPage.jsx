import { useEffect, useState } from "react";
import { useParams } from "react-router";

const EventDetailsPage = () => {
    const { id } = useParams();
    
    const [event, setEvent] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/events/${id}`
                );
                
                if (!response.ok) {
                    throw new Error("Failed to fetch event.");
                }
                
                const data = await response.json();
                
                console.log(data);
                
                setEvent(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchEvent();
    }, [id]);
    
    return (
    <main className="max-w-3xl mx-auto p-6">
        {isLoading && <p>Loading event...</p>}
        
        {error && <p className="text-red-500">{error}</p>}
        
        {event && (
            <article className="rounded-lg border p-6 shadow-sm">
                <h1 className="mb-4 text-4xl font-bold">
                    {event.title}  
                </h1>
                
                <p className="mb-4 text-lg">
                    {event.description}
                </p>

                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(event.date).toLocaleString()}
                </p>

                <p>
                    <strong>Location:</strong> {event.location}
                </p>
            </article>
        
        )}
        
    </main>
    
    );
};

export default EventDetailsPage;