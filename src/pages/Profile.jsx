import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function Profile() {

  const [user, setUser] = useState({});
  const [contacts, setContacts] = useState([]);

  const [editing, setEditing] =
    useState(false);

  const { darkMode, toggleTheme } =
    useTheme();

  useEffect(() => {

    const email =
      localStorage.getItem("email");

    fetch(
      `http://localhost:8080/users/${email}`
    )
      .then((res) => res.json())
      .then((data) => setUser(data));

    fetch(
      `http://localhost:8080/contacts/${email}`
    )
      .then((res) => res.json())
      .then((contactData) =>
        setContacts(contactData)
      );

  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setUser({
        ...user,
        profileImage: reader.result,
      });

    };

    reader.readAsDataURL(file);

  };

  // SAVE PROFILE
  const saveProfile = async () => {

    try {

      const response = await fetch(
        "http://localhost:8080/users/update",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(user),
        }
      );

      const data =
        await response.json();

      setUser(data);

      setEditing(false);

      alert("Profile Updated ✅");

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }

  };

  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");

    window.location.href = "/";

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-3 sm:px-5 py-4 sm:py-6">

      <Navbar />

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <div className="flex items-start sm:items-center gap-3 sm:gap-4 mt-4">

          <Link to="/home">

            <button className="text-white text-xl sm:text-2xl">

              ←

            </button>

          </Link>

          <div>

            <h1 className="text-white text-2xl sm:text-3xl font-bold">

              My Profile

            </h1>

            <p className="text-gray-400 text-xs sm:text-sm mt-1">

              Manage your SafeHer account

            </p>

          </div>

        </div>

        {/* PROFILE CARD */}
        <div className="mt-6 sm:mt-8 bg-[#1b1140] border border-pink-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col items-center text-center">

          <img
            src={
              user.profileImage ||

              "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            }
            alt=""
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-pink-500 object-cover"
          />

          {/* IMAGE CHANGE */}
          {
            editing && (

              <label className="mt-4 cursor-pointer bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-xl text-white text-sm">

                Change Photo

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={
                    handleImageUpload
                  }
                />

              </label>

            )
          }

          {
            editing ? (

              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
                className="mt-5 bg-[#251255] border border-pink-500/20 rounded-xl p-3 text-white outline-none text-center"
              />

            ) : (

              <h2 className="text-white text-xl sm:text-2xl font-bold mt-4 sm:mt-5 break-words">

                {user.name}

              </h2>

            )
          }

          <p className="text-gray-400 text-sm break-words mt-2">

            {user.email}

          </p>

          <div className="bg-green-500/20 text-green-400 px-4 sm:px-5 py-2 rounded-xl mt-4 sm:mt-5 text-xs sm:text-sm">

            Account Protected

          </div>

        </div>

        {/* PERSONAL INFO */}
        <div className="mt-6 sm:mt-8 bg-[#1b1140] border border-pink-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-pink-400 text-lg sm:text-xl font-bold">

              Personal Details

            </h2>

            {
              !editing ? (

                <button
                  onClick={() =>
                    setEditing(true)
                  }
                  className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-xl text-white text-sm"
                >

                  Edit

                </button>

              ) : (

                <button
                  onClick={saveProfile}
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-xl text-white text-sm"
                >

                  Save

                </button>

              )
            }

          </div>

          <div className="mt-4 sm:mt-5 space-y-4">

            {/* PHONE */}
            <div>

              <p className="text-gray-400">

                Phone

              </p>

              {
                editing ? (

                  <input
                    type="text"
                    name="phone"
                    value={user.phone || ""}
                    onChange={handleChange}
                    className="w-full mt-2 bg-[#251255] border border-pink-500/20 rounded-xl p-3 text-white outline-none"
                  />

                ) : (

                  <p className="text-white mt-2">

                    {user.phone}

                  </p>

                )
              }

            </div>

            {/* BLOOD */}
            <div>

              <p className="text-gray-400">

                Blood Group

              </p>

              {
                editing ? (

                  <input
                    type="text"
                    name="bloodGroup"
                    value={user.bloodGroup || ""}
                    onChange={handleChange}
                    className="w-full mt-2 bg-[#251255] border border-pink-500/20 rounded-xl p-3 text-white outline-none"
                  />

                ) : (

                  <p className="text-white mt-2">

                    {user.bloodGroup}

                  </p>

                )
              }

            </div>

            {/* ADDRESS */}
            <div>

              <p className="text-gray-400">

                Address

              </p>

              {
                editing ? (

                  <textarea
                    name="address"
                    value={user.address || ""}
                    onChange={handleChange}
                    className="w-full mt-2 bg-[#251255] border border-pink-500/20 rounded-xl p-3 text-white outline-none"
                  />

                ) : (

                  <p className="text-white mt-2 break-words">

                    {user.address}

                  </p>

                )
              }

            </div>

          </div>

        </div>

        {/* EMERGENCY CONTACTS */}
        <div className="mt-6 sm:mt-8 bg-[#1b1140] border border-pink-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6">

          <h2 className="text-pink-400 text-lg sm:text-xl font-bold">

            Emergency Contacts

          </h2>

          <Link to="/add-contact">

            <button className="bg-pink-500 text-white px-4 sm:px-5 py-2 rounded-xl mt-4 text-sm sm:text-base">

              + Add Contact

            </button>

          </Link>

          <div className="mt-5 space-y-4 sm:space-y-5">

            {
              contacts.length > 0 ? (

                contacts.map(
                  (contact, index) => (

                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >

                      <div>

                        <p className="text-white font-semibold text-sm sm:text-base">

                          {contact.name}

                        </p>

                        <p className="text-gray-400 text-xs sm:text-sm">

                          {contact.phone}

                        </p>

                      </div>

                      <a
                        href={`tel:${contact.phone}`}
                      >

                        <button className="bg-pink-500 px-4 py-2 rounded-xl text-white text-sm w-full sm:w-auto">

                          Call

                        </button>

                      </a>

                    </div>

                  )
                )

              ) : (

                <p className="text-gray-400 text-sm">

                  No emergency contacts added

                </p>

              )
            }

          </div>

        </div>

        {/* SETTINGS */}
        <div className="mt-6 sm:mt-8 bg-[#1b1140] border border-pink-500/20 rounded-2xl sm:rounded-3xl p-5 sm:p-6">

          <h2 className="text-pink-400 text-lg sm:text-xl font-bold">

            Settings

          </h2>

          <div className="mt-5 space-y-5">

            {/* DARK MODE */}
            <div className="flex items-center justify-between">

              <p className="text-white">
                Dark Mode
              </p>

              <button
                onClick={toggleTheme}
                className={`w-14 h-7 rounded-full transition-all ${
                  darkMode
                    ? "bg-pink-500"
                    : "bg-gray-500"
                }`}
              >

                <div
                  className={`w-5 h-5 bg-white rounded-full mt-[4px] transition-all ${
                    darkMode
                      ? "translate-x-8"
                      : "translate-x-1"
                  }`}
                ></div>

              </button>

            </div>

            {/* AI CHAT */}
            <Link to="/ai-chat">

              <div className="bg-[#251255] border border-pink-500/20 rounded-2xl p-4 hover:scale-[1.02] transition-all cursor-pointer">

                <div className="flex items-center gap-4">

                  <div className="text-4xl">
                    🤖
                  </div>

                  <div>

                    <h2 className="text-white font-bold text-lg">

                      AI Assistant

                    </h2>

                    <p className="text-gray-400 text-sm">

                      Chat with AI for instant safety help

                    </p>

                  </div>

                </div>

              </div>

            </Link>

            {/* AI ROUTE */}
            <Link to="/ai-safe-route">

              <div className="bg-[#251255] border border-pink-500/20 rounded-2xl p-4 hover:scale-[1.02] transition-all cursor-pointer">

                <div className="flex items-center gap-4">

                  <div className="text-4xl">
                    🛣️
                  </div>

                  <div>

                    <h2 className="text-white font-bold text-lg">

                      AI Safe Route

                    </h2>

                    <p className="text-gray-400 text-sm">

                      Find safer travel routes using AI

                    </p>

                  </div>

                </div>

              </div>

            </Link>

          </div>

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 transition-all text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl mt-6 sm:mt-8 font-semibold text-sm sm:text-base"
        >

          Logout

        </button>

        <div className="h-8 sm:h-10"></div>

      </div>

    </div>

  );

}

export default Profile;