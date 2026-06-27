import { useState } from "react";
import { useNavigate } from "react-router";

const CreateEventPage = () => {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setError("");
        setIsLoading(true);
        
        try {
            const token = localStorage.getItem("token");
            
            const response = await fetch(
                "http://localhost:3001/api/events",
                {
                    method: "POST",
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
                    data.error || "Failed to create event."
                );
            }
            
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
    <main className="mx-auto max-w-3xl p-6">
        <h1 className="mb-8 text-5xl font-bold">
            Create Event
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
            disabled={isLoading}
            className="w-full rounded bg-black p-4 text-white transition hover:bg-gray-800"
            >
                {isLoading
                ? "Creating..."
                : "Create Event"}
            </button>
        </form>
    </main>
    );
};

export default CreateEventPage;