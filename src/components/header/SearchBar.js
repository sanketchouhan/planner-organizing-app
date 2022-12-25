import React from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import GlobalContext from "../../context/GlobalContext";

function SearchBar() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const { setShowEventModal, savedEvents, setSelectedEvent } =
    React.useContext(GlobalContext);

  const searchEvents = savedEvents.filter(
    (evt) =>
      evt.title.toLowerCase().includes(searchTerm) ||
      evt.description.toLowerCase().includes(searchTerm) ||
      evt.notes.toLowerCase().includes(searchTerm)
  );

  const isDropdownVisible = searchTerm && searchEvents.length > 0;

  return (
    <div className="relative h-9">
      {isDropdownVisible && (
        <div
          className="fixed h-screen w-full top-0 left-0 z-30"
          onClick={() => setSearchTerm("")}
        />
      )}
      <div
        className="absolute left-1/2 top-0 bg-white border-2 rounded-lg z-40"
        style={{ transform: "translateX(-50%)" }}
      >
        <div
          className={`flex gap-2 items-center px-3 py-1 ${
            isDropdownVisible && `border-b`
          }`}
        >
          <input
            type="text"
            className="bg-transparent outline-none border-none focus:ring-0 p-0 w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div onClick={() => setSearchTerm("")} className="cursor-pointer">
            {searchTerm ? (
              <IoCloseOutline size={20} color="#6b7280" />
            ) : (
              <IoSearchOutline size={20} color="#6b7280" />
            )}
          </div>
        </div>
        {isDropdownVisible && (
          <div className="max-h-96 overflow-y-auto">
            {searchEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => {
                  setSelectedEvent(evt);
                  setShowEventModal(true);
                  setSearchTerm("");
                }}
                className="px-5 py-2 font-medium truncate hover:bg-gray-100 cursor-pointer"
              >
                {evt.title}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
