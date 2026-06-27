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

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="events/:id"
          element={<EventDetailsPage />}
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
    </BrowserRouter>
  );
};

export default App;