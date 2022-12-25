import React from "react";
import { IoHeart } from "react-icons/io5";
import logo from "../../assets/calendar.png";

export default function AppLoading() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <img src={logo} alt="App_logo" className="w-12 h-12" />

      <p className="flex items-center gap-1 text-xs text-gray-500 absolute bottom-5">
        <span>Made with</span>
        <IoHeart size={16} color="red" />
        <span>by &#169; sanket.chouhan555@gmail.com</span>
      </p>
    </div>
  );
}
