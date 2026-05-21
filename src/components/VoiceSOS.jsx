import { useEffect, useState } from "react";

function VoiceSOS() {

  const [listening, setListening] =
    useState(false);

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

      setMessage(
        "Speech Recognition Not Supported"
      );

      return;
    }

    const recognition =
      new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = false;

    recognition.lang = "en-US";

    recognition.onstart = () => {

      setListening(true);

    };

    recognition.onresult = (event) => {

      const transcript =
        event.results[
          event.results.length - 1
        ][0].transcript.toLowerCase();

      console.log("Voice:", transcript);

      if (
        transcript.includes("help") ||
        transcript.includes("save me") ||
        transcript.includes("emergency")
      ) {

        triggerSOS();

      }

    };

    recognition.onerror = (event) => {

      console.log(event.error);

      setListening(false);

    };

    recognition.onend = () => {

      recognition.start();

    };

    recognition.start();

    return () => {

      recognition.stop();

    };

  }, []);

  // SOS FUNCTION
  const triggerSOS = () => {

    setMessage(
      "🚨 Emergency Voice Detected!"
    );

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        const email =
          localStorage.getItem("email");

        const sosData = {

          userEmail: email,

          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,

        };

        try {

          const response = await fetch(
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

          const data =
            await response.json();

          console.log(data);

          alert(
            "SOS Activated By Voice 🚨"
          );

        } catch (error) {

          console.log(error);

          alert(
            "Voice SOS Failed"
          );

        }

      },

      (error) => {

        console.log(error);

        alert(
          "Location Permission Denied"
        );

      }

    );

  };

  return (

    <div className="bg-[#1b1140] border border-pink-500/20 rounded-3xl p-4 sm:p-5 mt-5 w-full">

      {/* TITLE */}
      <h2 className="text-pink-400 text-lg sm:text-xl font-bold">

        🎤 Voice SOS

      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-400 mt-3 text-sm sm:text-base leading-6">

        Say:
        <span className="text-white font-semibold">
          {" "}help
        </span>
        ,
        <span className="text-white font-semibold">
          {" "}save me
        </span>
        ,
        <span className="text-white font-semibold">
          {" "}emergency
        </span>

      </p>

      {/* STATUS */}
      <div className="mt-5 flex items-center gap-3">

        <div
          className={`w-4 h-4 rounded-full ${
            listening
              ? "bg-green-500 animate-pulse"
              : "bg-red-500"
          }`}
        ></div>

        <p className="text-white text-sm sm:text-base">

          {
            listening
              ? "Listening..."
              : "Not Listening"
          }

        </p>

      </div>

      {/* MESSAGE */}
      {

        message && (

          <div className="mt-5 bg-[#251255] border border-pink-500/20 rounded-2xl p-4">

            <p className="text-green-400 text-sm sm:text-base text-center">

              {message}

            </p>

          </div>

        )

      }

    </div>

  );

}

export default VoiceSOS;