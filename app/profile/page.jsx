"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({});
  const router = useRouter();

  const getUser = async () => {
    try {
      const response = await axios.get("/api/users/getMe", {
        withCredentials: true,
      });
      const userId = response.data.user._id;
      setUser(userId);
      router.push(`/profile/${user}`);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Profile Page</h2>
        <button
          onClick={getUser}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all"
        >
          Get User Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
