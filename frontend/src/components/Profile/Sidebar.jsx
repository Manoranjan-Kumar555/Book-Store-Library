import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img className="h-[10vh]" src={data.avater} alt="avater" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">
          {data.userName}
        </p>
        <p className="mt-1 text-narmal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[5px] bg-zinc-500 hidden lg:block"></div>
      </div>

      <div className="w-full flex-col mt-4 items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 text-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 text-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/setting"
          className="text-zinc-100 text-semibold w-full py-2 text-center hover:bg-zinc-900 rounded items-center flex justify-center gap-4 transition-all duration-300"
        >
          Settings <IoSettings />
        </Link>
      </div>
      <button className="bg-zinc-900 flex w-full lg:w=full mt-4 lg:mt-0 text-white font-semibold py-2 rounded items-center justify-center  hover:bg-red-700 rounded transition-all duration-300">
        Log Out <MdOutlineLogout  className= "ms-4"/>
      </button>
    </div>
  );
};

export default Sidebar;
