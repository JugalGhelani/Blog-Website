import React from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer transition-transform duration-200 hover:scale-105"
      />

      <button
        onClick={() => navigate("/admin")}
        className="group flex items-center gap-2 rounded-full bg-[#5044E5] px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-[#4338CA] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#5044E5]/40 cursor-pointer"
      >
        Login
        <img
          src={assets.arrow}
          alt="arrow"
          className="w-3 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </div>
  );
};

export default NavBar;
