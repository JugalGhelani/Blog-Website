import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const NavBar = () => {

  const {navigate, token} = useAppContext();

  return (
    <div className="flex items-center justify-between py-5 mx-8 sm:mx-20 xl:mx-32">
      {/* logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
      />

      {/* login button */}
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-primary/90"
      >
        {token ? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="arrow" className="w-3" />
      </button>
    </div>
  );
};

export default NavBar;
