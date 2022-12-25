import React from "react";
// import Image from "../assets/add-file.png";
import GlobalContext from "../../context/GlobalContext";
// import closeImg from "../assets/close.png";
import { IoAdd } from "react-icons/io5";

export default function CreateEventButton() {
  const { setShowEventModal } = React.useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="hidden sm:flex border py-2 px-4 rounded-full items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white transition-all"
    >
      <IoAdd size={18} color="#ffffff" />
      <span className="text-xs font-medium">New Event</span>
    </button>
  );
}
