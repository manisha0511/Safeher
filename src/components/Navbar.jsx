import { Link, useLocation } from "react-router-dom";

function Navbar() {

  const location = useLocation();

  return (

    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 px-2">

      <div className="w-full max-w-[430px] bg-[#14082e]/95 backdrop-blur-lg border-t border-pink-500/20 flex items-center justify-around py-3 rounded-t-3xl">

        {/* Home */}
        <Link to="/home">

          <div className={`flex flex-col items-center ${location.pathname === "/home" ? "text-pink-400" : "text-white"}`}>

            <span className="text-xl sm:text-2xl">🏠</span>

            <p className="text-[10px] sm:text-xs mt-1">
              Home
            </p>

          </div>

        </Link>

        {/* Map */}
        <Link to="/map">

          <div className={`flex flex-col items-center ${location.pathname === "/map" ? "text-pink-400" : "text-white"}`}>

            <span className="text-xl sm:text-2xl">📍</span>

            <p className="text-[10px] sm:text-xs mt-1">
              Map
            </p>

          </div>

        </Link>

        {/* SOS */}
        <Link to="/sos">

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(255,0,100,0.8)] -mt-8 sm:-mt-10">

            <p className="text-white font-bold text-lg sm:text-xl">
              SOS
            </p>

          </div>

        </Link>

        {/* History */}
        <Link to="/history">

          <div className={`flex flex-col items-center ${location.pathname === "/history" ? "text-pink-400" : "text-white"}`}>

            <span className="text-xl sm:text-2xl">🕒</span>

            <p className="text-[10px] sm:text-xs mt-1">
              History
            </p>

          </div>

        </Link>

        {/* Profile */}
        <Link to="/profile">

          <div className={`flex flex-col items-center ${location.pathname === "/profile" ? "text-pink-400" : "text-white"}`}>

            <span className="text-xl sm:text-2xl">👤</span>

            <p className="text-[10px] sm:text-xs mt-1">
              Profile
            </p>

          </div>

        </Link>

      </div>

    </div>

  );
}

export default Navbar;