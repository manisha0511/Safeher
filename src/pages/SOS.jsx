import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import CameraRecorder from "../components/CameraRecorder";
import { useEffect, useState } from "react";

import { startAIDetection } from "../utils/aiDetection";
import { requestNotificationPermission, showNotification } from "../utils/notification";

function SOS() {
  const [location, setLocation] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [sosActive, setSosActive] = useState(false);

  const monitorBattery = async () => {
    try {
      const battery = await navigator.getBattery();

      battery.addEventListener("levelchange", async () => {
        const level = Math.floor(battery.level * 100);

        if (level <= 10 && location) {
          const email = localStorage.getItem("email");

          await fetch("http://localhost:8080/battery/alert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userEmail: email,
              batteryLevel: level,
              latitude: location.latitude,
              longitude: location.longitude,
            }),
          });

          showNotification("🔋 Low Battery Alert", "Phone battery below 10%");

          const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

          if (contacts.length > 0) {
            const phone = contacts[0].phone.replace(/\s+/g, "");

            const message = `🚨 LOW BATTERY ALERT 🚨\n\nBattery low.\n\n📍 ${mapsLink}`;

            window.open(
              `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
              "_blank"
            );
          }

          alert("Low Battery Emergency Sent 🔋");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
    startAIDetection(activateSOS);

    const email = localStorage.getItem("email");

    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });

    fetch(`http://localhost:8080/contacts/${email}`)
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  useEffect(() => {
    if (location && contacts.length > 0) {
      monitorBattery();
    }
  }, [location, contacts]);

  const activateSOS = async () => {
    const email = localStorage.getItem("email");

    if (!location) return alert("Location not found");

    try {
      await fetch("http://localhost:8080/sos/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: email,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      setSosActive(true);

      showNotification("🚨 SOS Activated", "Emergency alert sent!");

      const mapsLink = `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

      if (contacts.length > 0) {
        const phone = contacts[0].phone.replace(/\s+/g, "");

        const message = `🚨 EMERGENCY 🚨\nNeed help!\n📍 ${mapsLink}`;

        window.open(
          `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
          "_blank"
        );
      }

      alert("SOS Activated 🚨");
    } catch (err) {
      console.log(err);
      alert("SOS Failed");
    }
  };

  const stopSOS = () => {
    setSosActive(false);
    showNotification("✅ SOS Stopped", "Emergency mode off");
    alert("SOS Stopped");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0000] via-[#3b0000] to-black px-3 sm:px-5 py-4 flex flex-col items-center">

      <Navbar />
      <CameraRecorder />

      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="flex items-center justify-between mt-3">
          <Link to="/home">
            <button className="text-white text-xl sm:text-2xl">
              ←
            </button>
          </Link>

          <h1 className="text-white text-lg sm:text-2xl font-bold text-center">
            Emergency SOS
          </h1>

          <div />
        </div>

        {/* SOS BUTTON */}
        <div className="mt-10 sm:mt-16 relative flex justify-center">

          {sosActive && (
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 animate-ping" />
          )}

          <div
            onClick={activateSOS}
            className={`
              w-48 h-48 sm:w-64 sm:h-64 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-500
              ${
                sosActive
                  ? "bg-gradient-to-br from-red-500 to-pink-700 shadow-[0_0_60px_rgba(255,0,0,0.7)]"
                  : "bg-gradient-to-br from-gray-700 to-gray-900"
              }
            `}
          >
            <h1 className="text-white text-5xl sm:text-7xl font-bold">
              SOS
            </h1>

            <p className="text-white mt-2 sm:mt-3 text-sm sm:text-lg text-center">
              {sosActive ? "Emergency Active" : "Tap To Activate"}
            </p>
          </div>
        </div>

        {/* STATUS CARD */}
        <div className="w-full mt-10 sm:mt-14 bg-[#200000]/80 border border-red-500/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6">

          <div className="flex items-center justify-between">
            <h2 className="text-white text-lg sm:text-xl font-bold">
              Alert Status
            </h2>

            <div
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${
                sosActive ? "bg-green-400 animate-pulse" : "bg-gray-500"
              }`}
            />
          </div>

          <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4 text-sm sm:text-base">

            <div className="flex justify-between">
              <p className="text-gray-300">📹 Video</p>
              <p className="text-green-400">{sosActive ? "Active" : "Inactive"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-300">🎤 Audio</p>
              <p className="text-green-400">{sosActive ? "Active" : "Inactive"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-300">📍 Location</p>
              <p className="text-green-400">{sosActive ? "Shared" : "Off"}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-300">👨‍👩‍👧 Contacts</p>
              <p className="text-green-400">{contacts.length} Alerted</p>
            </div>

          </div>
        </div>

        {/* MAP + BUTTONS */}
        {location && (
          <div className="mt-6 text-center">
            <p className="text-white text-sm">
              Lat: {location.latitude}
            </p>
            <p className="text-white text-sm">
              Lng: {location.longitude}
            </p>

            <a
              href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
              target="_blank"
              rel="noreferrer"
            >
              <button className="mt-4 bg-pink-500 px-5 py-3 rounded-xl text-white text-sm sm:text-base">
                Open Location 📍
              </button>
            </a>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full">

          <a href="tel:100" className="flex-1">
            <button className="w-full bg-white text-black py-4 rounded-xl font-semibold">
              Call Police
            </button>
          </a>

          <button
            onClick={stopSOS}
            className="flex-1 bg-red-600 text-white py-4 rounded-xl font-semibold"
          >
            Stop SOS
          </button>

        </div>

        <p className="text-gray-400 text-center mt-8 text-xs sm:text-sm px-3">
          Your live location and recordings are securely shared with trusted contacts.
        </p>

      </div>
    </div>
  );
}

export default SOS;