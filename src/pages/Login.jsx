import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

  };

  const handleLogin = async () => {

    if (!loginData.email || !loginData.password) {

      alert("Please fill all fields");

      return;

    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(loginData),
        }
      );

      const data = await response.text();

      if (data !== "Invalid Email or Password") {

        localStorage.setItem("token", data);

        localStorage.setItem(
          "email",
          loginData.email
        );

        alert("Login Successful 🚀");

        navigate("/home");

      } else {

        alert("Invalid Email or Password");

      }

    } catch (error) {

      console.log(error);

      alert("Backend Error");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-4 py-6">

      <div className="w-full max-w-[380px] bg-[#14082e]/90 border border-pink-500/30 rounded-[30px] p-5 sm:p-7 shadow-2xl">

        {/* Logo */}
        <div className="flex items-center gap-2">

          <img
            src="https://cdn-icons-png.flaticon.com/512/3534/3534063.png"
            alt="logo"
            className="w-10 h-10 object-cover"
          />

          <div>

            <h1 className="text-white text-2xl font-bold">
              SafeHer
            </h1>

            <p className="text-gray-400 text-[11px]">
              Women Safety App
            </p>

          </div>

        </div>

        {/* Main Image */}
        <div className="flex justify-center mt-6 sm:mt-8">

          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
            alt="women safety"
            className="w-28 sm:w-40"
          />

        </div>

        {/* Welcome Text */}
        <h2 className="text-white text-2xl sm:text-3xl font-bold text-center mt-4">

          Welcome Back!

        </h2>

        <p className="text-gray-400 text-center text-sm mt-2 px-2">

          Login to continue your safe journey

        </p>

        {/* Inputs */}
        <div className="mt-6">

          <input
            type="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            placeholder="Phone Number / Email"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none mb-4 text-sm sm:text-base"
          />

          <input
            type="password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 text-white outline-none text-sm sm:text-base"
          />

          <div className="flex justify-end mt-2">

            <p className="text-pink-400 text-sm cursor-pointer">

              Forgot Password?

            </p>

          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 transition-all text-white font-semibold py-3 rounded-xl mt-5 active:scale-95"
          >

            {
              loading
                ? "Logging In..."
                : "Login"
            }

          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mt-6">

            <div className="flex-1 h-[1px] bg-gray-600"></div>

            <p className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">

              or continue with

            </p>

            <div className="flex-1 h-[1px] bg-gray-600"></div>

          </div>

          {/* Social Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-5">

            <button className="flex-1 bg-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-200 transition-all active:scale-95">

              <img
                src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
                alt=""
                className="w-5 h-5"
              />

              Google

            </button>

            <button className="flex-1 bg-white rounded-xl py-3 flex items-center justify-center gap-2 font-medium hover:bg-gray-200 transition-all active:scale-95">

              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt=""
                className="w-5 h-5"
              />

              Facebook

            </button>

          </div>

          {/* Signup */}
          <p className="text-center text-gray-400 text-sm mt-7">

            Don’t have an account?{" "}

            <Link
              to="/signup"
              className="text-pink-400 font-semibold"
            >

              Sign Up

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;