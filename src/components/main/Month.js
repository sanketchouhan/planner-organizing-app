import dayjs from "dayjs";
import React from "react";
import GlobalContext from "../../context/GlobalContext";
import Day from "./Day";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

export default function Month({ month }) {
  const { monthIndex, setMonthIndex } = React.useContext(GlobalContext);

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <div className="flex-1 flex flex-col shadow-md bg-white p-2 pt-0 rounded">
      <header className="text-center py-4 flex items-center justify-center gap-5 font-semibold">
        <button onClick={handlePrevMonth}>
          <IoChevronBack size={18} color="#000000" />
        </button>
        <span className="w-36">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </span>
        <button onClick={handleNextMonth}>
          <IoChevronForward size={18} color="#000000" />
        </button>
      </header>
      <div className="flex gap-0.5 bg-gray-200 pb-0.5">
        {month[0].map((day, i) => (
          <span
            className="flex-1 text-sm font-medium text-gray-500 py-2 text-center truncate bg-white"
            key={i}
          >
            {day.format("dddd")}
          </span>
        ))}
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-0.5 bg-gray-200 overflow-hidden">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day day={day} key={idx} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
