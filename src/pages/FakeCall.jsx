import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function FakeCall() {

  const [calling, setCalling] =
    useState(false);

  const [caller, setCaller] =
    useState("");

  const [callerImage, setCallerImage] =
    useState("");

  const audioRef = useRef(null);

  // RANDOM CALLERS
  const callers = [

    {
      name: "Police Helpline",
      image:
        "https://cdn-icons-png.flaticon.com/512/3062/3062634.png",
    },

    {
      name: "Dad",
      image:
        "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    },

    {
      name: "Best Friend",
      image:
        "https://cdn-icons-png.flaticon.com/512/6997/6997662.png",
    },

    {
      name: "Office",
      image:
        "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },

    {
      name: "Unknown Number",
      image:
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },

    {
      name: "Emergency Contact",
      image:
        "https://cdn-icons-png.flaticon.com/512/3059/3059518.png",
    },

  ];

  useEffect(() => {

    const timer = setTimeout(() => {

      // RANDOM PERSON
      const randomPerson =

        callers[
          Math.floor(
            Math.random() *
            callers.length
          )
        ];

      setCaller(randomPerson.name);

      setCallerImage(
        randomPerson.image
      );

      setCalling(true);

      // AUDIO
      audioRef.current =
        new Audio("/ringtone.mp3");

      audioRef.current.loop = true;

      audioRef.current.play()
        .catch((err) => {

          console.log(
            "Audio Error:",
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

  // ACCEPT
  const acceptCall = () => {

    if (audioRef.current) {

      audioRef.current.pause();

    }

    navigator.vibrate(0);

    alert(
      `📞 Connected with ${caller}`
    );

  };

  // REJECT
  const rejectCall = () => {

    if (audioRef.current) {

      audioRef.current.pause();

    }

    navigator.vibrate(0);

    setCalling(false);

  };

  return (

    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">

      {/* BACK */}
      <Link
        to="/home"
        className="absolute top-5 left-5 text-white text-3xl z-50"
      >

        ←

      </Link>

      {/* WAIT SCREEN */}
      {
        !calling ? (

          <div className="text-center px-5">

            <div className="w-28 h-28 rounded-full bg-green-500/20 flex items-center justify-center mx-auto animate-pulse">

              <span className="text-5xl">
                📞
              </span>

            </div>

            <h1 className="text-white text-4xl font-bold mt-8">

              Fake Call Activated

            </h1>

            <p className="text-gray-400 mt-5 text-lg">

              Incoming call in 5 seconds...

            </p>

          </div>

        ) : (

          <div className="flex flex-col items-center text-center w-full px-5">

            {/* CALL IMAGE */}
            <div className="relative">

              <div className="absolute inset-0 rounded-full bg-green-500 blur-3xl opacity-30 animate-pulse"></div>

              <img
                src={callerImage}
                alt=""
                className="relative w-40 h-40 rounded-full border-4 border-green-500 object-cover"
              />

            </div>

            {/* CALLER NAME */}
            <h1 className="text-white text-4xl font-bold mt-10">

              {caller}

            </h1>

            {/* STATUS */}
            <p className="text-green-400 text-xl mt-4 animate-pulse">

              Incoming Call...

            </p>

            {/* TIMER */}
            <p className="text-gray-500 mt-2">

              Mobile Calling...
            </p>

            {/* BUTTONS */}
            <div className="flex gap-12 mt-20">

              {/* REJECT */}
              <button
                onClick={rejectCall}
                className="w-24 h-24 rounded-full bg-red-600 text-white text-4xl shadow-2xl active:scale-95 transition-all"
              >

                ✕

              </button>

              {/* ACCEPT */}
              <button
                onClick={acceptCall}
                className="w-24 h-24 rounded-full bg-green-600 text-white text-4xl shadow-2xl animate-bounce active:scale-95 transition-all"
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