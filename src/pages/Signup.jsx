import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();
      console.log(data);

      alert("Signup Successful 🚀");
    } catch (error) {
      console.log(error);
      alert("Backend Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-4 py-6">

      <div className="w-full max-w-md bg-[#14082e]/90 border border-pink-500/30 rounded-2xl sm:rounded-[30px] p-5 sm:p-7 shadow-2xl">

        {/* Back Button */}
        <Link to="/">
          <button className="text-white text-xl sm:text-2xl mb-4">
            ←
          </button>
        </Link>

        {/* Heading */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-gray-400 text-center text-xs sm:text-sm mt-2">
          Join SafeHer and stay protected
        </p>

        {/* Form */}
        <div className="mt-6 sm:mt-8">

          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none mb-3 sm:mb-4 text-sm sm:text-base"
          />

          <input
            type="text"
            name="phone"
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none mb-3 sm:mb-4 text-sm sm:text-base"
          />

          <input
            type="text"
            name="bloodGroup"
            value={user.bloodGroup}
            onChange={handleChange}
            placeholder="Blood Group"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none mb-3 sm:mb-4 text-sm sm:text-base"
          />

          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none mb-3 sm:mb-4 text-sm sm:text-base"
          />

          <input
            type="email"
            name="email"
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none mb-3 sm:mb-4 text-sm sm:text-base"
          />

          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none mb-3 sm:mb-4 text-sm sm:text-base"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none text-sm sm:text-base"
          />

          {/* Terms */}
          <div className="flex items-start gap-2 mt-5">
            <input type="checkbox" className="mt-1" />
            <p className="text-gray-400 text-xs sm:text-sm leading-5">
              I agree to the{" "}
              <span className="text-pink-400">Terms & Conditions</span>
            </p>
          </div>

          {/* Signup Button */}
          <button
            onClick={handleSignup}
            className="w-full bg-pink-500 hover:bg-pink-600 transition-all text-white font-semibold py-3 rounded-xl mt-5 sm:mt-6 text-sm sm:text-base"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-5 sm:mt-6">
            <div className="flex-1 h-[1px] bg-gray-600"></div>
            <p className="text-gray-400 text-xs sm:text-sm">
              or continue with
            </p>
            <div className="flex-1 h-[1px] bg-gray-600"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-5">

            <button className="flex-1 bg-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-200 transition-all text-sm sm:text-base">

              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt=""
                className="w-5 h-5"
              />

              Google
            </button>

            <button className="flex-1 bg-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-200 transition-all text-sm sm:text-base">

              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt=""
                className="w-5 h-5"
              />

              Facebook
            </button>

          </div>

          {/* Login */}
          <p className="text-center text-gray-400 text-xs sm:text-sm mt-6 sm:mt-7">
            Already have an account?{" "}
            <Link to="/" className="text-pink-400 font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Signup;