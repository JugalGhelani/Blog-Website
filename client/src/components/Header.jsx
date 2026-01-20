import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative z-10 mx-6 sm:mx-12 lg:mx-20 xl:mx-32 pt-20 sm:pt-24 pb-24 sm:pb-32 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#5044E5]/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-[#5044E5] shadow-sm">
          <p>New: AI feature integrated</p>
          <img
            src={assets.star_icon}
            className="w-3 sm:w-4 animate-pulse"
            alt="star"
          />
        </div>

        <h1 className="mt-6 sm:mt-8 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-gray-900">
          Your own <span className="text-primary">blogging</span> platform.
        </h1>

        <p className="mx-auto mt-4 max-w-xl sm:max-w-2xl text-sm sm:text-base leading-6 sm:leading-7 text-gray-600">
          Share your thoughts, ideas, and stories with the world through your
        </p>

        <form className="mx-auto mt-8 flex w-full max-w-xs sm:max-w-md md:max-w-lg items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
          <input
            type="text"
            placeholder="Search for Blogs"
            required
            className="flex-1 rounded-lg px-3 py-2 text-sm sm:text-base text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 sm:px-5 py-2 text-sm sm:text-base font-medium text-white transition-colors hover:bg-primary/90"
          >
            Search
          </button>
        </form>
      </div>

      <img
        src={assets.gradientBackground}
        alt="gradient background"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-90"
      />
    </div>
  );
};

export default Header;
