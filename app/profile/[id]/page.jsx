"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use } from "react";

const UserProfile = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  const logout = async () => {
    const response = await axios.get("/api/users/logout", {
      withCredentials: true,
    });
    console.log(response.data);
    router.push("/");
  };
  return (
    <>
      <div>{id}</div>
      <button
        onClick={logout}
        className="bg-blue-500 text-white border-1 border-yellow-300 
        p-[6px] cursor-pointer rounded-3xl"
      >
        Logout
      </button>
    </>
  );
};
export default UserProfile;
