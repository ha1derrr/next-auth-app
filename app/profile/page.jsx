"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const logout = async () => {
    const response = await axios.get("/api/users/logout", {
      withCredentials: true,
    });
    console.log(response.data);
    router.push("/");
  };
  return (
    <>
      <div>Profile Page</div>
      <button onClick={logout}>Logout</button>
    </>
  );
};
export default Profile;
