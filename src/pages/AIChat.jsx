import { useState } from "react";
import { Link } from "react-router-dom";

function AIChat() {

  const [message, setMessage] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // SEND MESSAGE
  const sendMessage = async () => {

    if (!message.trim()) return;

    const userMessage = {
      type: "user",
      text: message,
    };

    setChat((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentMessage =
      message;

    setMessage("");

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/ai/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      // BACKEND ERROR
      if (!response.ok) {

        const errorText =
          await response.text();

        throw new Error(
          errorText
        );

      }

      const data =
        await response.text();

      const aiMessage = {
        type: "ai",
        text: data,
      };

      setChat((prev) => [
        ...prev,
        aiMessage,
      ]);

    } catch (error) {

      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          type: "ai",

          text:
            "⚠️ AI temporarily unavailable. Please try again.",
        },
      ]);

    }

    setLoading(false);

  };

  // ENTER PRESS
  const handleKeyPress = (e) => {

    if (e.key === "Enter") {

      sendMessage();

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] flex flex-col">

      {/* HEADER */}
      <div className="flex items-center gap-4 p-5 border-b border-pink-500/20 bg-[#14082e]/80 backdrop-blur-md sticky top-0 z-50">

        <Link to="/profile">

          <button className="text-white text-2xl hover:text-pink-400 transition-all">

            ←

          </button>

        </Link>

        <div>

          <h1 className="text-white text-2xl font-bold">

            SafeHer AI

          </h1>

          <p className="text-pink-300 text-sm">

            Your safety companion 🤖

          </p>

        </div>

      </div>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">

        {
          chat.length === 0 && (

            <div className="flex flex-col items-center justify-center h-full text-center mt-20">

              <div className="text-7xl mb-6">

                🤖

              </div>

              <h2 className="text-white text-3xl font-bold">

                Ask SafeHer AI

              </h2>

              <p className="text-gray-400 mt-4 max-w-md leading-relaxed">

                Get safety tips, emergency help,
                travel guidance, and emotional support instantly.

              </p>

            </div>

          )
        }

        {
          chat.map((msg, index) => (

            <div
              key={index}
              className={`flex ${
                msg.type === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >

              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-3xl whitespace-pre-wrap shadow-lg ${
                  msg.type === "user"
                    ? "bg-pink-500 text-white rounded-br-md"
                    : "bg-[#251255] text-white border border-pink-500/20 rounded-bl-md"
                }`}
              >

                {msg.text}

              </div>

            </div>

          ))
        }

        {
          loading && (

            <div className="flex justify-start">

              <div className="bg-[#251255] border border-pink-500/20 text-white p-4 rounded-3xl rounded-bl-md w-fit animate-pulse">

                Thinking...

              </div>

            </div>

          )
        }

      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t border-pink-500/20 bg-[#14082e]/80 backdrop-blur-md">

        <div className="flex gap-3 items-center">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={
              handleKeyPress
            }
            placeholder="Ask SafeHer AI..."
            className="flex-1 bg-[#251255] border border-pink-500/20 rounded-2xl p-4 text-white placeholder:text-gray-400 outline-none focus:border-pink-500 transition-all"
          />

          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 px-6 sm:px-8 py-4 rounded-2xl text-white font-semibold transition-all active:scale-95"
          >

            {
              loading
                ? "..."
                : "Send"
            }

          </button>

        </div>

      </div>

    </div>

  );

}

export default AIChat;