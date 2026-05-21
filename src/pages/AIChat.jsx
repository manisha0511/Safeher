import { useState } from "react";
import { Link } from "react-router-dom";

function AIChat() {

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
    };

    setChat((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {

      const response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,

{
  method: "POST",

  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({

    contents: [
      {
        parts: [
          {
            text: currentMessage,
          },
        ],
      },
    ],

  }),
}

);

      const data =
        await response.json();

      console.log(data);

      if (
        data.candidates &&
        data.candidates.length > 0
      ) {

        const aiReply =

          data.candidates[0]
          .content.parts[0].text;

        setChat((prev) => [

          ...prev,

          {
            sender: "ai",
            text: aiReply,
          },

        ]);

      } else {

        setChat((prev) => [

          ...prev,

          {
            sender: "ai",
            text:
              "⚠️ No AI response",
          },

        ]);

      }

    } catch (error) {

      console.log(error);

      setChat((prev) => [

        ...prev,

        {
          sender: "ai",
          text:
            "⚠️ API Error",
        },

      ]);

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] p-4 pb-32">

      {/* TOP */}
      <div className="flex items-center gap-4">

        <Link to="/profile">

          <button className="text-white text-2xl">
            ←
          </button>

        </Link>

        <div>

          <h1 className="text-white text-3xl font-bold">

            SafeHer AI

          </h1>

          <p className="text-gray-400 text-sm">

            Women Safety Assistant

          </p>

        </div>

      </div>

      {/* CHAT */}
      <div className="mt-6 space-y-4">

        {
          chat.map((item, index) => (

            <div
              key={index}
              className={`p-4 rounded-2xl max-w-[85%]

              ${
                item.sender === "user"

                ? "bg-pink-500 text-white ml-auto"

                : "bg-[#1b1140] text-white"
              }`}
            >

              {item.text}

            </div>

          ))
        }

        {
          loading && (

            <div className="bg-[#1b1140] text-white p-4 rounded-2xl w-fit">

              AI is typing...

            </div>

          )
        }

      </div>

      {/* INPUT */}
      <div className="fixed bottom-5 left-0 right-0 flex justify-center px-4">

        <div className="w-full max-w-[600px] bg-[#14082e] border border-pink-500/20 rounded-2xl p-3 flex gap-3">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Ask safety question..."
            className="flex-1 bg-transparent outline-none text-white"
          />

          <button
            onClick={sendMessage}
            className="bg-pink-500 hover:bg-pink-600 px-5 py-2 rounded-xl text-white"
          >

            Send

          </button>

        </div>

      </div>

    </div>

  );

}

export default AIChat;