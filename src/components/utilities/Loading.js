import React from "react";
import logo from "../../assets/calendar.png";

export default function Loading() {
  return (
    <div
      className="h-screen w-full bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center"
      style={{ zIndex: "100" }}
    >
      <img src={logo} alt="App_logo" className="w-12 h-12" />
    </div>
  );
}
