import { NavLink } from "react-router";

const Navbar = () => {
    return (
    <nav className="py-4">
        <ul className="flex justify-center gap-8 list-none p-0">
            <li>
                <NavLink to="/">Home</NavLink>
            </li>

            <li>
                <NavLink to="/signin">Sign In</NavLink>
            </li>

            <li>
                <NavLink to="/signup">Sign Up</NavLink>
            </li>

            <li>
                <NavLink to="/create-event">Create Event</NavLink>
            </li>
        </ul>
    </nav>
    );
};

export default Navbar;