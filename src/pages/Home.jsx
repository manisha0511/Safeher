import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import VoiceSOS from "../components/VoiceSOS";
import { useEffect, useState } from "react";

function Home() {

  const [userName, setUserName] =
    useState("");

  useEffect(() => {

    const email =
      localStorage.getItem("email");

    fetch(
      `http://localhost:8080/users/${email}`
    )
      .then((res) => res.json())
      .then((data) => {

        setUserName(data.name);

      });

  }, []);

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");

    window.location.href = "/";

  };

  // LEARN MORE
  const learnMore = () => {

    alert(
      "SafeHer helps women stay protected using SOS alerts, live tracking, fake calls, AI detection, voice SOS & emergency notifications 🚨"
    );

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-4 py-5 pb-32">

      <Navbar />

      {/* TOP SECTION */}
      <div className="flex flex-col items-center mt-4 sm:mt-6">

        {/* LOGO */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6YcmnBB8Oq-C9hXSlA0NIx3Ivp7F3eYfC7Q&s"
          alt=""
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-pink-500 shadow-lg object-cover"
        />

        {/* USER NAME */}
        <h1 className="text-white text-2xl sm:text-3xl mt-4 font-bold text-center leading-tight">

          Hello,
          {" "}
          {userName || "User"} 👋

        </h1>

        <p className="text-gray-400 mt-2 text-center text-sm sm:text-base">

          Stay Alert, Stay Safe

        </p>

      </div>

      {/* SAFETY CARD */}
      <div className="mt-8 bg-[#1b1140] rounded-3xl p-4 sm:p-5 border border-pink-500/20 flex items-center justify-between gap-4">

        {/* LEFT */}
        <div className="flex-1">

          <h2 className="text-white text-xl sm:text-2xl font-bold leading-tight">

            You Are Safe

          </h2>

          <p className="text-gray-400 mt-2 text-xs sm:text-sm leading-5">

            Your protection is our priority

          </p>

          <button
            onClick={learnMore}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-5 py-2 rounded-xl mt-4 text-sm sm:text-base transition-all"
          >

            Learn More

          </button>

        </div>

        {/* IMAGE */}
        <img
          src="https://static.vecteezy.com/system/resources/previews/067/476/309/non_2x/gold-queen-profile-crown-letter-q-logo-design-vector.jpg"
          alt=""
          className="w-20 sm:w-28 rounded-2xl"
        />

      </div>

      

      {/* SOS BUTTON */}
      <div className="flex justify-center mt-10">

        <Link to="/sos">

          <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(255,0,100,0.8)] animate-pulse cursor-pointer transition-all active:scale-95">

            <h1 className="text-white text-5xl sm:text-6xl font-bold">

              SOS

            </h1>

            <p className="text-white mt-2 text-sm sm:text-base">

              Tap To Alert

            </p>

          </div>

        </Link>

      </div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-4 mt-12">

        {/* LIVE TRACKING */}
        <Link to="/map">

          <div className="bg-[#1b1140] rounded-2xl p-4 sm:p-5 border border-pink-500/20 hover:scale-105 transition-all">

            <h2 className="text-3xl">

              📍

            </h2>

            <p className="text-white mt-3 font-semibold text-sm sm:text-base">

              Live Tracking

            </p>

          </div>

        </Link>

        {/* FAKE CALL */}
        <Link to="/fake-call">

          <div className="bg-[#1b1140] rounded-2xl p-4 sm:p-5 border border-pink-500/20 hover:scale-105 transition-all">

            <h2 className="text-3xl">

              📞

            </h2>

            <p className="text-white mt-3 font-semibold text-sm sm:text-base">

              Fake Call

            </p>

          </div>

        </Link>

        {/* HISTORY */}
        <Link to="/history">

          <div className="bg-[#1b1140] rounded-2xl p-4 sm:p-5 border border-pink-500/20 hover:scale-105 transition-all">

            <h2 className="text-3xl">

              🕒

            </h2>

            <p className="text-white mt-3 font-semibold text-sm sm:text-base">

              History

            </p>

          </div>

        </Link>

        {/* SAFETY TIPS */}
        <Link to="/safety-tips">

          <div className="bg-[#1b1140] rounded-2xl p-4 sm:p-5 border border-pink-500/20 hover:scale-105 transition-all cursor-pointer">

            <h2 className="text-3xl">

              🛡️

            </h2>

            <p className="text-white mt-3 font-semibold text-sm sm:text-base">

              Safety Tips

            </p>

          </div>

        </Link>

      </div>

      {/* LOGOUT BUTTON */}
      <div className="flex justify-center mt-10">

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-3 rounded-2xl transition-all text-sm sm:text-base active:scale-95"
        >

          Logout

        </button>

      </div>

    </div>

  );

}

export default Home;