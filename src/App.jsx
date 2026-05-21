import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddContact from "./pages/AddContact";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import MapPage from "./pages/Mappage";
import History from "./pages/History";
import SOS from "./pages/SOS";
import Details from "./pages/Details";
import FakeCall from "./pages/FakeCall";
import SafetyTips from "./pages/SafetyTips";
import AIChat from "./pages/AIChat";
import AISafeRoute from "./pages/AISafeRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-contact"
          element={
            <ProtectedRoute>
              <AddContact />
            </ProtectedRoute>
          }
        />

        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sos"
          element={
            <ProtectedRoute>
              <SOS />
            </ProtectedRoute>
          }
        />

        <Route
          path="/details"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fake-call"
          element={
            <ProtectedRoute>
              <FakeCall />
            </ProtectedRoute>
          }
        />

        <Route
          path="/safety-tips"
          element={
            <ProtectedRoute>
              <SafetyTips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-chat"
          element={
            <ProtectedRoute>
              <AIChat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-safe-route"
          element={
            <ProtectedRoute>
              <AISafeRoute />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;