import { useState } from "react";
import { useNavigate } from "react-router";

const SignUpPage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        setError("");
        setIsSubmitting(true);
        
        try {
            const response = await fetch("http://localhost:3001/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
                body: JSON.stringify(formData),
            });
            
            if (!response.ok) {
                throw new Error("Failed to create account.");
            }
            
            navigate("/signin");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
    <main className="max-w-md mx-auto p-6">
        <h1 className="mb-6 text-4xl font-bold">Sign Up</h1>
        
        {error && <p className="mb-4 text-red-500">{error}</p>}
        
        <form
        onSubmit={handleSubmit}
        className="grid gap-4"
        >
            <label className="grid gap-1">
                Name
                <input
                className="rounded border p-2"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                />
            </label>
            
            <label className="grid gap-1">
                Email
                <input
                className="rounded border p-2"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </label>
            
            <label className="grid gap-1">
                Password
                <input
                className="rounded border p-2"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </label>
            
            <button
            className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
            >
                {isSubmitting ? "Creating account..." : "Create account"}
            </button>
        </form>
    </main>
    );
};

export default SignUpPage;