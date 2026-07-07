import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { API_URL } from "../config/api";

const EventDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [event, setEvent] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/api/events/${id}`
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
    
    const handleDelete = async () => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );
        
        if (!confirmed) {
            return;
        }
        
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch(
                `${API_URL}/api/events/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            if (!response.ok) {
                throw new Error("Failed to delete event.");
            }
            
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    const handleEdit = () => {
        navigate(`/events/${id}/edit`);
    };
    
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
                
                <div className="mt-6 flex gap-4">
                    <button 
                    onClick={handleEdit}
                    className="rounded bg-olive-400 px-4 py-2 text-white transition-opacity hover:opacity-90">
                        Edit Event
                    </button>
                    
                    <button
                    onClick={handleDelete}
                    className="rounded bg-zinc-600 px-4 py-2 text-white transition-opacity hover:opacity-90"
                    >
                        Delete Event
                    </button>
                </div>
            </article>
        )}
    </main>
    );
};

export default EventDetailsPage;