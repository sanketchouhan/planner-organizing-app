import dayjs from "dayjs";
import React from "react";
import GlobalContext from "../../context/GlobalContext";
import { getLableClass } from "../../util";

function Day({ day }) {
  const [dayEvents, setDayEvents] = React.useState([]);
  const {
    monthIndex,
    selectedDay,
    setSelectedDay,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = React.useContext(GlobalContext);

  React.useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY") ||
        (evt.isRecurring && dayjs(evt.day).date() === day.date())
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY"))
      return "bg-blue-600 text-white rounded-full w-7";
  }

  function getSelectedDayClass() {
    if (
      selectedDay &&
      day.format("DD-MM-YY") === selectedDay.format("DD-MM-YY")
    )
      return "text-blue-600 border-t-2 border-blue-600";
  }

  function getSameMonthClass() {
    if (day.month() !== monthIndex % 12) return "text-gray-400";
  }

  return (
    <div
      className="flex flex-col bg-white cursor-pointer"
      onClick={() => {
        setSelectedDay(day);
        setShowEventModal(true);
      }}
    >
      <header className={`py-1 px-3 ${getSelectedDayClass()}`}>
        <span
          className={`text-sm font-medium py-1 px-2 ${getCurrentDayClass()} ${getSameMonthClass()}`}
        >
          {day.format("DD")}
        </span>
      </header>
      <div className="flex-1 overflow-auto">
        {dayEvents.map((evt) => (
          <div
            key={evt.id}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${getLableClass(evt.labelId).color}-100 border-${
              getLableClass(evt.labelId).color
            }-700  border-l-2 px-2 py-1 text-gray-700 text-sm m-1 mt-0 truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Day);
