import { useEffect, useState } from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

function MapPage() {

  const [currentLocation, setCurrentLocation] = useState({
    lat: 23.2599,
    lng: 77.4126,
  });

  const [loading, setLoading] = useState(true);

  const [shareMessage, setShareMessage] =
    useState("");

  const [tracking, setTracking] =
    useState(true);

  // LIVE LOCATION TRACKING
  useEffect(() => {

    if (!tracking) return;

    const watchId =
      navigator.geolocation.watchPosition(

        (position) => {

          const newLocation = {

            lat: position.coords.latitude,
            lng: position.coords.longitude,

          };

          console.log(
            "LIVE LOCATION:",
            newLocation
          );

          setCurrentLocation(newLocation);

          setLoading(false);

        },

        (error) => {

          console.log(error);

          alert(
            "Location permission denied"
          );

          setLoading(false);

        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }

      );

    return () =>
      navigator.geolocation.clearWatch(
        watchId
      );

  }, [tracking]);

  // SHARE LIVE LOCATION
  const shareLiveLocation = async () => {

    const mapLink =
      `https://www.google.com/maps?q=${currentLocation.lat},${currentLocation.lng}`;

    console.log(
      "SHARED LOCATION:",
      mapLink
    );

    const email =
      localStorage.getItem("email");

    const sosData = {

      userEmail: email,

      latitude: currentLocation.lat,

      longitude: currentLocation.lng,

    };

    try {

      // SAVE IN DATABASE + SEND SMS
      await fetch(
        "http://localhost:8080/sos/send",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            sosData
          ),
        }
      );

      // SHARE API
      if (navigator.share) {

        await navigator.share({

          title: "SafeHer Live Location",

          text:
            "📍 My Live Location",

          url: mapLink,

        });

      } else {

        window.open(
          mapLink,
          "_blank"
        );

      }

      setShareMessage(
        "✅ Live location shared successfully"
      );

    } catch (error) {

      console.log(error);

      setShareMessage(
        "❌ Failed to share location"
      );

    }

  };

  // STOP TRACKING
  const stopTracking = () => {

    setTracking(false);

    setShareMessage(
      "❌ Live tracking stopped"
    );

  };

  const containerStyle = {

    width: "100%",
    height: "55vh",
    borderRadius: "25px",

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] p-4 sm:p-5 pb-28">

      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">

        <Link to="/home">

          <button className="text-white text-2xl">

            ←

          </button>

        </Link>

        <div>

          <h1 className="text-white text-2xl sm:text-3xl font-bold">

            Live Tracking

          </h1>

          <p className="text-gray-400 text-xs sm:text-sm mt-1">

            Real-time location monitoring

          </p>

        </div>

      </div>

      {/* MAP */}
      <div className="mt-6 sm:mt-8 overflow-hidden rounded-3xl border border-pink-500/20">

        <LoadScript
          googleMapsApiKey={
            import.meta.env
              .VITE_GOOGLE_MAPS_API_KEY
          }
        >

          {
            loading ? (

              <div className="h-[55vh] flex items-center justify-center bg-[#1b1140]">

                <p className="text-white text-lg sm:text-xl">

                  Loading Map...

                </p>

              </div>

            ) : (

              <GoogleMap
                mapContainerStyle={
                  containerStyle
                }
                center={currentLocation}
                zoom={16}
              >

                <Marker
                  position={currentLocation}
                />

              </GoogleMap>

            )
          }

        </LoadScript>

      </div>

      {/* LOCATION INFO */}
      <div className="mt-6 bg-[#1b1140] rounded-3xl p-4 sm:p-5 border border-pink-500/20">

        <div className="flex items-center justify-between gap-3">

          <div className="overflow-hidden">

            <h2 className="text-white text-lg sm:text-xl font-bold">

              Current Location

            </h2>

            <p className="text-gray-400 text-xs sm:text-sm mt-1 break-all">

              Latitude:
              {" "}
              {currentLocation.lat}

            </p>

            <p className="text-gray-400 text-xs sm:text-sm break-all">

              Longitude:
              {" "}
              {currentLocation.lng}

            </p>

          </div>

          <div className="w-4 h-4 bg-green-400 rounded-full animate-ping shrink-0"></div>

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3 mt-5">

          <button
            onClick={shareLiveLocation}
            className="flex-1 bg-pink-500 hover:bg-pink-600 active:scale-95 transition-all text-white py-3 rounded-xl text-sm sm:text-base"
          >

            Share Live

          </button>

          <button
            onClick={stopTracking}
            className="flex-1 bg-[#251255] border border-pink-500/20 active:scale-95 transition-all text-white py-3 rounded-xl text-sm sm:text-base"
          >

            Stop Tracking

          </button>

        </div>

        {/* SHARE STATUS */}
        {
          shareMessage && (

            <p className="text-green-400 mt-4 text-center text-sm sm:text-base break-words">

              {shareMessage}

            </p>

          )
        }

      </div>

      <Navbar />

    </div>

  );

}

export default MapPage;