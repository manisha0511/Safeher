import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddContact() {

  const navigate = useNavigate();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {

    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });

  };

  const saveContact = async () => {

    const userEmail =
      localStorage.getItem("email");

    const finalData = {
      ...contact,
      userEmail,
    };

    try {

      const response = await fetch(
        "http://localhost:8080/contacts/add",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            finalData
          ),
        }
      );

      const data =
        await response.json();

      console.log(data);

      alert(
        "Contact Added Successfully ❤️"
      );

      navigate("/profile");

    } catch (error) {

      console.log(error);

      alert(
        "Error adding contact"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] px-4 py-6">

      {/* CARD */}
      <div className="w-full max-w-[400px] bg-[#14082e]/90 border border-pink-500/30 rounded-[30px] p-5 sm:p-7 shadow-2xl">

        {/* BACK BUTTON */}
        <Link to="/profile">

          <button className="text-white text-2xl mb-5">

            ←

          </button>

        </Link>

        {/* HEADING */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center">

          Add Contact

        </h1>

        <p className="text-gray-400 text-center text-sm mt-2 leading-6">

          Add trusted emergency contact

        </p>

        {/* FORM */}
        <div className="mt-8">

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Contact Name"
            onChange={handleChange}
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none mb-4 text-sm sm:text-base"
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full bg-[#1f1147] border border-pink-500/20 rounded-xl p-3 sm:p-4 text-white outline-none mb-4 text-sm sm:text-base"
          />

          {/* BUTTON */}
          <button
            onClick={saveContact}
            className="w-full bg-pink-500 hover:bg-pink-600 transition-all text-white font-semibold py-3 sm:py-4 rounded-xl mt-3 text-sm sm:text-base"
          >

            Save Contact

          </button>

        </div>

      </div>

    </div>

  );

}

export default AddContact;