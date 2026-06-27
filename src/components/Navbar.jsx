import { NavLink, useNavigate } from "react-router";

const Navbar = () => {
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");
    
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };
    
    return (
    <nav className="py-4">
        <ul className="flex justify-center gap-8 list-none p-0">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            
            {!token ? (
                <>
                <li>
                    <NavLink to="/signin">Sign In</NavLink>
                </li>
                
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
                </>
                ) : (
                <>
                <li>
                    <NavLink to="/create-event">
                    Create Event
                    </NavLink>
                </li>
                
                <li>
                    <button
                    onClick={handleLogout}
                    className="cursor-pointer"
                    >
                        Logout
                    </button>
                </li>
                </>
            )}
        </ul>
    </nav>
    );
};

export default Navbar;