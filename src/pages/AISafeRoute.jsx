import { useState } from "react";
import { Link } from "react-router-dom";

function AISafeRoute() {

  const [start, setStart] =
    useState("");

  const [destination, setDestination] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [aiResponse, setAiResponse] =
    useState("");

  // GENERATE SAFE ROUTE
  const generateRoute = async () => {

    if (!start || !destination) {

      alert("Enter locations");

      return;

    }

    setLoading(true);

    try {

      const prompt = `
      Suggest the safest travel route for a woman traveling from ${start} to ${destination} in India.

      Include:
      1. Safe transport suggestion
      2. Safety precautions
      3. Areas to avoid
      4. Emergency tips
      5. Night safety tips

      Keep answer short and practical.
      `;

      const response =
        await fetch(

          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY{import.meta.env.VITE_GEMINI_API_KEY}`,

          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],

            }),
          }
        );

      const data =
        await response.json();

      const text =
        data.candidates?.[0]
          ?.content?.parts?.[0]
          ?.text ||
        "No safe route found";

      setAiResponse(text);

    } catch (error) {

      console.log(error);

      alert("AI Error");

    }

    setLoading(false);

  };

  // OPEN GOOGLE MAP
  const openMap = () => {

    const url =
      `https://www.google.com/maps/dir/${start}/${destination}`;

    window.open(url, "_blank");

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] p-5">

      {/* HEADER */}
      <div className="flex items-center gap-4">

        <Link to="/home">

          <button className="text-white text-2xl">

            ←

          </button>

        </Link>

        <div>

          <h1 className="text-white text-3xl font-bold">

            AI Safe Route

          </h1>

          <p className="text-gray-400 text-sm mt-1">

            AI powered women safety navigation

          </p>

        </div>

      </div>

      {/* CARD */}
      <div className="mt-10 bg-[#1b1140] border border-pink-500/20 rounded-3xl p-5">

        {/* START */}
        <input
          type="text"
          placeholder="Enter Start Location"
          value={start}
          onChange={(e) =>
            setStart(e.target.value)
          }
          className="w-full bg-[#251255] border border-pink-500/20 rounded-xl p-4 text-white outline-none mb-4"
        />

        {/* DESTINATION */}
        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
          className="w-full bg-[#251255] border border-pink-500/20 rounded-xl p-4 text-white outline-none"
        />

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-4 mt-6">

          <button
            onClick={generateRoute}
            className="bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-2xl"
          >

            {
              loading
                ? "Generating..."
                : "Generate Route"
            }

          </button>

          <button
            onClick={openMap}
            className="bg-[#251255] border border-pink-500/20 text-white py-3 rounded-2xl"
          >

            Open Map

          </button>

        </div>

      </div>

      {/* AI RESPONSE */}
      {
        aiResponse && (

          <div className="mt-8 bg-[#1b1140] border border-pink-500/20 rounded-3xl p-5">

            <h2 className="text-pink-400 text-2xl font-bold">

              AI Safety Guidance

            </h2>

            <p className="text-white mt-5 whitespace-pre-line leading-8">

              {aiResponse}

            </p>

          </div>

        )
      }

      <div className="h-10"></div>

    </div>

  );

}

export default AISafeRoute;