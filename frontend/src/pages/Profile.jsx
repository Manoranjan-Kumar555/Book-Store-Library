import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
import axios from "axios";
import GolbalLoader from "../components/GlobalLoader/GolbalLoader";

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [userProfile, setUserProfile] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-info",
          { headers }
        );
        console.log("Profile", response.data.data);
        setUserProfile(response.data.data);
        alert(response.data.message);
      } catch (error) {
        console.error(
          "Error fetching user info:",
          error.response?.data?.message || error.message
        );
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md: flex-row h-[100vh] py-8 gap-4 text-white">
        {!userProfile && (
          <div className="w-full h-[100%] flex items-center justify-center">
            <GolbalLoader />
          </div>
        )}
        {userProfile && (
          <>
            <div className="w-full md:w-1/6">
              <Sidebar data={userProfile} />
            </div>
            <div className="w-full md:w-5/6">
              <Outlet />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
