import { useState } from "react";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import EventDetailsPage from "./pages/EventDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  return (
    <BrowserRouter>
      <div
        className={
          isDarkTheme
            ? "dark-theme min-h-screen bg-[#1f1b18] text-stone-200"
            : "light-theme min-h-screen bg-[#f1ebe1] text-stone-700"
        }
      >
        <Navbar
          isDarkTheme={isDarkTheme}
          onToggleTheme={() =>
            setIsDarkTheme(!isDarkTheme)
          }
        />

        <Routes>
          <Route
            index
            element={<HomePage isDarkTheme={isDarkTheme} />}
          />

          <Route
            path="events/:id"
            element={<EventDetailsPage />}
          />

          <Route
            path="events/:id/edit"
            element={<EditEventPage />}
          />

          <Route
            path="signin"
            element={<SignInPage />}
          />

          <Route
            path="signup"
            element={<SignUpPage />}
          />

          <Route
            path="create-event"
            element={
              <ProtectedRoute>
                <CreateEventPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;