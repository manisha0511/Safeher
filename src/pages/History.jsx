import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    const email =
      localStorage.getItem("email");

    fetch(
      `http://localhost:8080/sos/${email}`
    )
      .then((res) => res.json())
      .then((data) => {

        setHistory(data.reverse());

      });

  }, []);

  // VIEW DETAILS
  const viewDetails = (item) => {

    alert(

`🚨 SOS DETAILS

📧 Email:
${item.userEmail}

📍 Latitude:
${item.latitude}

📍 Longitude:
${item.longitude}

🕒 Time:
${item.alertTime}

🗺️ Google Map:
https://maps.google.com/?q=${item.latitude},${item.longitude}`

    );

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-4 py-5 pb-32">

      <Navbar />

      {/* HEADER */}
      <div className="flex items-center gap-3">

        <Link to="/home">

          <button className="text-white text-2xl">

            ←

          </button>

        </Link>

        <div>

          <h1 className="text-white text-2xl sm:text-3xl font-bold">

            SOS History

          </h1>

          <p className="text-gray-400 text-xs sm:text-sm mt-1">

            Your emergency records

          </p>

        </div>

      </div>

      {/* HISTORY */}
      <div className="mt-8 space-y-5">

        {
          history.length > 0 ? (

            history.map((item, index) => (

              <div
                key={index}
                className="bg-[#1b1140] border border-pink-500/20 rounded-3xl p-4 sm:p-5 shadow-lg"
              >

                {/* TOP */}
                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h2 className="text-white text-lg sm:text-xl font-bold leading-tight">

                      Emergency Triggered

                    </h2>

                    <p className="text-gray-400 text-xs sm:text-sm mt-1 break-words">

                      {item.alertTime}

                    </p>

                  </div>

                  <div className="bg-red-500/20 text-red-400 px-3 py-2 rounded-xl text-xs sm:text-sm whitespace-nowrap">

                    Active

                  </div>

                </div>

                {/* DETAILS */}
                <div className="mt-5 space-y-3">

                  <p className="text-gray-300 text-sm sm:text-base break-all">

                    📍 Latitude:
                    {" "}
                    {item.latitude}

                  </p>

                  <p className="text-gray-300 text-sm sm:text-base break-all">

                    📍 Longitude:
                    {" "}
                    {item.longitude}

                  </p>

                  <p className="text-gray-300 text-sm sm:text-base">

                    👨‍👩‍👧 Contacts Alerted

                  </p>

                </div>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6">

                  {/* VIEW DETAILS */}
                  <button
                    onClick={() =>
                      viewDetails(item)
                    }
                    className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-2xl transition-all text-sm sm:text-base"
                  >

                    View Details

                  </button>

                  {/* OPEN MAP */}
                  <a
                    href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1"
                  >

                    <button className="w-full bg-[#251255] border border-pink-500/20 text-white py-3 rounded-2xl text-sm sm:text-base">

                      Open Map

                    </button>

                  </a>

                </div>

              </div>

            ))

          ) : (

            <div className="text-center mt-20">

              <h2 className="text-white text-2xl font-bold">

                No SOS History 🚫

              </h2>

              <p className="text-gray-400 mt-3 text-sm sm:text-base">

                Your emergency alerts will appear here

              </p>

            </div>

          )
        }

      </div>

    </div>

  );

}

export default History;