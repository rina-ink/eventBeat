import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditEventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
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
                
                setTitle(data.title);
                setDescription(data.description);
                setDate(data.date.slice(0, 16));
                setLocation(data.location);
                setLatitude(data.latitude);
                setLongitude(data.longitude);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchEvent();
    }, [id]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setError("");
        setIsSubmitting(true);
        
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch(
                `http://localhost:3001/api/events/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        title,
                        description,
                        date,
                        location,
                        latitude: Number(latitude),
                        longitude: Number(longitude),
                    }),
                }
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(
                    data.error || "Failed to update event."
                );
            }
            
            navigate(`/events/${id}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    if (isLoading) {
        return (
        <main className="max-w-3xl mx-auto p-6">
            <p>Loading event...</p>
        </main>
        );
    }
    
    return (
    <main className="max-w-3xl mx-auto p-6">
        <h1 className="mb-8 text-5xl font-bold">
            Edit Event
        </h1>
        
        {error && (
            <p className="mb-6 text-red-500">
                {error}
            </p>
        )}
        
        <form
        onSubmit={handleSubmit}
        className="space-y-6"
        >
            <div>
                <label className="mb-2 block text-xl">
                    Title
                </label>
                
                <input
                type="text"
                value={title}
                onChange={(event) =>
                    setTitle(event.target.value)
                }
                className="w-full rounded border p-4"
                required
                />
            </div>
            
            <div>
                <label className="mb-2 block text-xl">
                    Description
                </label>
                
                <textarea
                value={description}
                onChange={(event) =>
                    setDescription(event.target.value)
                }
                rows="5"
                className="w-full rounded border p-4"
                required
                />
            </div>
            
            <div>
                <label className="mb-2 block text-xl">
                    Date
                </label>
                
                <input
                type="datetime-local"
                value={date}
                onChange={(event) =>
                    setDate(event.target.value)
                }
                className="w-full rounded border p-4"
                required
                />
            </div>
            
            <div>
                <label className="mb-2 block text-xl">
                    Location
                </label>
                
                <input
                type="text"
                value={location}
                onChange={(event) =>
                    setLocation(event.target.value)
                }
                className="w-full rounded border p-4"
                required
                />
            </div>

            <div>
                <label className="mb-2 block text-xl">
                    Latitude
                </label>
                
                <input
                type="number"
                step="any"
                value={latitude}
                onChange={(event) =>
                    setLatitude(event.target.value)
                }
                className="w-full rounded border p-4"
                required
                />
            </div>

            <div>
                <label className="mb-2 block text-xl">
                    Longitude
                </label>
                
                <input
                type="number"
                step="any"
                value={longitude}
                onChange={(event) =>
                    setLongitude(event.target.value)
                }
                className="w-full rounded border p-4"
                required
                />
            </div>
            
            <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-amber-200 p-4 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
                {isSubmitting
                ? "Saving..."
                : "Save changes"}
            </button>
        </form>
    </main>
    );
};

export default EditEventPage;