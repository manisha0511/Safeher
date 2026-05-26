import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    address: "",
    profileImage: "",
  });

  useEffect(() => {

    const email =
      localStorage.getItem("email");

    fetch(
      `http://localhost:8080/users/${email}`
    )
      .then((res) => res.json())
      .then((data) => setUser(data));

  }, []);

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  // IMAGE UPLOAD
  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      setUser((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));

    };

    reader.readAsDataURL(file);

  };

  // SAVE PROFILE
  const saveProfile = async () => {

    const email =
      localStorage.getItem("email");

    try {

      const response = await fetch(

        `http://localhost:8080/users/update/${email}`,

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
        await response.text();

      alert(data);

      navigate("/profile");

    } catch (error) {

      console.log(error);

      alert("Update failed");

    }

  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1b093d] to-[#3b0764] p-5">

      <h1 className="text-white text-3xl font-bold">

        Edit Profile

      </h1>

      <div className="mt-8 bg-[#1b1140] p-5 rounded-3xl border border-pink-500/20">

        {/* IMAGE */}
        <div className="flex flex-col items-center">

          <img
            src={
              user.profileImage ||

              "https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            }
            alt=""
            className="w-28 h-28 rounded-full border-4 border-pink-500 object-cover"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="mt-4 text-white"
          />

        </div>

        {/* INPUTS */}
        <div className="mt-6 space-y-4">

          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full bg-[#251255] p-4 rounded-xl text-white outline-none"
          />

          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="w-full bg-[#251255] p-4 rounded-xl text-white outline-none"
          />

          <input
            type="text"
            name="bloodGroup"
            value={user.bloodGroup}
            onChange={handleChange}
            placeholder="Blood Group"
            className="w-full bg-[#251255] p-4 rounded-xl text-white outline-none"
          />

          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full bg-[#251255] p-4 rounded-xl text-white outline-none"
          />

          <button
            onClick={saveProfile}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl"
          >

            Save Changes

          </button>

        </div>

      </div>

    </div>

  );

}

export default EditProfile;