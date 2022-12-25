import React from "react";
import logo from "../../assets/calendar.png";
import Notification from "./Notification";
import CreateEventButton from "./CreateEventButton";
import SearchBar from "./SearchBar";
import UserAuth from "./UserAuth";

function CalenderHeader() {
  return (
    <div className="h-16 px-1 sm:px-3 md:px-5 py-3 flex justify-between items-center bg-white shadow-md">
      <div className="flex items-center cursor-pointer">
        <img src={logo} alt="App_logo" className="mr-2 w-10 h-10" />
        <h1 className="hidden sm:block text-lg text-gray-600 font-semibold">
          Planner Organizing App
        </h1>
      </div>
      <SearchBar />
      <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
        <CreateEventButton />
        <Notification />
        <UserAuth />
      </div>
    </div>
  );
}

export default React.memo(CalenderHeader);
