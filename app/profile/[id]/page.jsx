"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { use } from "react";

const UserProfile = ({ params }) => {
  const router = useRouter();

  const { id } = use(params);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout", {
        withCredentials: true,
      });
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Welcome, User</h2>
        <p className="text-gray-700 mb-4">User ID: {id}</p>
        <button
          onClick={logout}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
