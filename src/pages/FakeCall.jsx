import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function FakeCall() {

  const [calling, setCalling] =
    useState(false);

  const audioRef = useRef(null);

  useEffect(() => {

    const timer = setTimeout(() => {

      setCalling(true);

      // RINGTONE
      audioRef.current = new Audio(
        "https://www.soundjay.com/phone/phone-ring-01a.mp3"
      );

      audioRef.current.loop = true;

      audioRef.current.play()
        .catch((err) => {
          console.log(
            "Audio blocked:",
            err
          );
        });

      // VIBRATION
      if (navigator.vibrate) {

        navigator.vibrate([
          500,
          300,
          500,
          300,
          500,
        ]);

      }

    }, 5000);

    return () => {

      clearTimeout(timer);

      if (audioRef.current) {

        audioRef.current.pause();

      }

    };

  }, []);

  // ACCEPT CALL
  const acceptCall = () => {

    if (audioRef.current) {

      audioRef.current.pause();

    }

    navigator.vibrate(0);

    alert("Call Connected 📞");

  };

  // REJECT CALL
  const rejectCall = () => {

    if (audioRef.current) {

      audioRef.current.pause();

    }

    navigator.vibrate(0);

    alert("Call Rejected");

    setCalling(false);

  };

  return (

    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 relative">

      {/* BACK BUTTON */}
      <Link
        to="/home"
        className="absolute top-5 left-5 text-white text-3xl"
      >

        ←

      </Link>

      {
        !calling ? (

          <div className="text-center">

            <h1 className="text-white text-3xl sm:text-4xl font-bold leading-tight">

              Fake Call Activated

            </h1>

            <p className="text-gray-400 mt-5 text-sm sm:text-base">

              Incoming call in 5 seconds...

            </p>

          </div>

        ) : (

          <div className="flex flex-col items-center text-center w-full">

            {/* PROFILE */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              alt=""
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-green-500 shadow-lg"
            />

            {/* CALLER NAME */}
            <h1 className="text-white text-3xl sm:text-4xl font-bold mt-8">

              Mom Calling...

            </h1>

            {/* STATUS */}
            <p className="text-green-400 mt-3 text-lg sm:text-xl animate-pulse">

              Incoming Call

            </p>

            {/* BUTTONS */}
            <div className="flex gap-8 sm:gap-12 mt-16">

              {/* REJECT */}
              <button
                onClick={rejectCall}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-red-600 text-white text-3xl shadow-lg active:scale-95 transition-all"
              >

                ✕

              </button>

              {/* ACCEPT */}
              <button
                onClick={acceptCall}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-600 text-white text-3xl shadow-lg active:scale-95 transition-all"
              >

                📞

              </button>

            </div>

          </div>

        )
      }

    </div>

  );

}

export default FakeCall;