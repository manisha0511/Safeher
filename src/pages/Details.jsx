import { Link } from "react-router-dom";

function Details() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-4 py-8">

      {/* CARD */}
      <div className="w-full max-w-[420px] bg-[#14082e]/90 border border-pink-500/30 rounded-[30px] p-5 sm:p-7 shadow-2xl">

        {/* BACK BUTTON */}
        <Link to="/signup">

          <button className="text-white text-2xl mb-4">

            ←

          </button>

        </Link>

        {/* HEADING */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center leading-tight">

          Add Your Details

        </h1>

        <p className="text-gray-400 text-center text-sm mt-2 leading-6">

          Help us protect you better

        </p>

        {/* PERSONAL INFO */}
        <div className="mt-8">

          <h2 className="text-pink-400 font-semibold mb-4 text-base sm:text-lg">

            Personal Information

          </h2>

          {/* DATE */}
          <input
            type="date"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none mb-4 text-sm sm:text-base"
          />

          {/* BLOOD GROUP */}
          <input
            type="text"
            placeholder="Blood Group"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none mb-4 text-sm sm:text-base"
          />

          {/* ADDRESS */}
          <input
            type="text"
            placeholder="Current Address"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none text-sm sm:text-base"
          />

        </div>

        {/* EMERGENCY CONTACTS */}
        <div className="mt-8">

          <h2 className="text-pink-400 font-semibold mb-4 text-base sm:text-lg">

            Emergency Contacts

          </h2>

          {/* PARENT NAME */}
          <input
            type="text"
            placeholder="Parent / Guardian Name"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none mb-4 text-sm sm:text-base"
          />

          {/* PARENT NUMBER */}
          <input
            type="text"
            placeholder="Parent Phone Number"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none mb-4 text-sm sm:text-base"
          />

          {/* FRIEND NAME */}
          <input
            type="text"
            placeholder="Best Friend Name"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none mb-4 text-sm sm:text-base"
          />

          {/* FRIEND NUMBER */}
          <input
            type="text"
            placeholder="Best Friend Number"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none text-sm sm:text-base"
          />

        </div>

        {/* BUTTON */}
        <button className="w-full bg-pink-500 hover:bg-pink-600 transition-all text-white font-semibold py-3 sm:py-4 rounded-xl mt-8 text-sm sm:text-base">

          Save & Continue

        </button>

      </div>

    </div>

  );

}

export default Details;