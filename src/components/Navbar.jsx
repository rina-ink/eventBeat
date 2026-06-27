import { NavLink, useNavigate } from "react-router";

const Navbar = ({
  isDarkTheme,
  onToggleTheme,
}) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav
      className={
        isDarkTheme
          ? "border-b border-stone-700 bg-[#2c2521]/80 py-5 backdrop-blur-sm"
          : "border-b border-stone-200 bg-white/60 py-5 backdrop-blur-sm"
      }
    >
      <ul
        className={
          isDarkTheme
            ? "flex justify-center gap-10 list-none p-0 text-sm lowercase tracking-widest text-stone-300"
            : "flex justify-center gap-10 list-none p-0 text-sm lowercase tracking-widest text-stone-700"
        }
      >
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

        <li>
          <button
            onClick={onToggleTheme}
            className="cursor-pointer"
          >
            {isDarkTheme ? "☀︎" : "☾"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;