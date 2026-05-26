import { Link } from "react-router-dom";

function SafetyTips() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-3 sm:px-5 py-4 sm:py-6">
      
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
          <Link to="/home">
            <button className="text-white text-xl sm:text-2xl">
              ←
            </button>
          </Link>

          <div>
            <h1 className="text-white text-2xl sm:text-3xl font-bold">
              Safety Tips
            </h1>

            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Stay aware. Stay protected.
            </p>
          </div>
        </div>

        {/* SAFETY TIPS */}
        <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

          {/* TIP CARD */}
          {[
            {
              title: "🚕 Travel Safely",
              desc: "Always share your live location with trusted contacts while travelling.",
            },
            {
              title: "📱 Keep Emergency Numbers Ready",
              desc: "Save emergency contacts and keep your phone charged at all times.",
            },
            {
              title: "🌃 Avoid Isolated Areas",
              desc: "Prefer well-lit and crowded areas while travelling alone at night.",
            },
            {
              title: "📢 Trust Your Instincts",
              desc: "If something feels unsafe, immediately move to a safer location and contact trusted people.",
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="bg-[#1b1140] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-pink-500/20"
            >
              <h2 className="text-white text-lg sm:text-xl font-bold">
                {tip.title}
              </h2>
              <p className="text-gray-400 mt-2 sm:mt-3 leading-6 sm:leading-7 text-sm sm:text-base">
                {tip.desc}
              </p>
            </div>
          ))}

          {/* EMERGENCY NUMBERS */}
          <div className="bg-[#1b1140] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-pink-500/20">
            <h2 className="text-white text-lg sm:text-xl font-bold">
              ☎️ Emergency Numbers
            </h2>

            <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-sm sm:text-base">
              <p className="text-gray-300">🚔 Police: 100</p>
              <p className="text-gray-300">🚑 Ambulance: 108</p>
              <p className="text-gray-300">👩 Women Helpline: 1091</p>
              <p className="text-gray-300">🚨 National Emergency: 112</p>
              <p className="text-gray-300">💻 Cyber Crime Helpline: 1930</p>
            </div>
          </div>

          {/* LINKS */}
          <div className="bg-[#1b1140] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-pink-500/20">
            <h2 className="text-white text-lg sm:text-xl font-bold">
              🇮🇳 Government Women Safety Portals
            </h2>

            <p className="text-gray-400 mt-2 text-xs sm:text-sm">
              Official women safety and emergency help resources
            </p>

            <div className="mt-4 sm:mt-5 flex flex-col gap-3 sm:gap-4">

              <a
                href="https://www.ncw.gov.in/"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl sm:rounded-2xl transition-all text-sm sm:text-base">
                  👩 National Commission For Women
                </button>
              </a>

              <a
                href="https://whl.tnsw.in/#:~:text=THE%20OBJECTIVES%20OF%20THE%20181%20%2D%20WOMEN%20HELPLINE&text=To%20facilitate%20crisis%20and%20non,the%20woman%20affected%20by%20violence."
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-full bg-[#251255] border border-pink-500/20 text-white py-3 rounded-xl sm:rounded-2xl text-center hover:bg-pink-500 transition-all text-sm sm:text-base">
                  ☎️ Women Helpline Numbers
                </div>
              </a>

              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-full bg-[#251255] border border-pink-500/20 text-white py-3 rounded-xl sm:rounded-2xl text-center hover:bg-pink-500 transition-all text-sm sm:text-base">
                  💻 Cyber Crime Portal
                </div>
              </a>

              <a
                href="https://www.mha.gov.in/en/commoncontent/emergency-response-support-system-erss"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="w-full bg-[#251255] border border-pink-500/20 text-white py-3 rounded-xl sm:rounded-2xl text-center hover:bg-pink-500 transition-all text-sm sm:text-base">
                  🚨 National Emergency Support
                </div>
              </a>

            </div>
          </div>

        </div>

        <div className="h-8 sm:h-10"></div>
      </div>
    </div>
  );
}

export default SafetyTips;