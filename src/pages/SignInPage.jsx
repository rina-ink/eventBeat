import { useState } from "react";
import { useNavigate } from "react-router";

const SignInPage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
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
            const response = await fetch(
                "http://localhost:3001/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || "Failed to sign in.");
            }
            
            localStorage.setItem("token", data.token);
            
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
    <main className="mx-auto max-w-2xl p-6">
        <h1 className="mb-8 text-5xl font-bold">Sign In</h1>
        
        {error && <p className="mb-4 text-red-500">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
                <span className="mb-2 block">Email</span>
                
                <input
                className="w-full rounded border p-3"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                />
            </label>
            
            <label className="block">
                <span className="mb-2 block">Password</span>
                
                <input
                className="w-full rounded border p-3"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                required
                />
            </label>
            
            <button
            className="w-full rounded bg-black p-3 text-white disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
            >
                {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
        </form>
    </main>
    );
};

export default SignInPage;