import dayjs from "dayjs";
import React from "react";
import GlobalContext from "../../context/GlobalContext";
import { getLableClass, getMonth, labelsClasses } from "../../util";
import {
  IoCheckmarkSharp,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

function SmallCalender() {
  const [currentMonthIdx, setCurrentMonthIdx] = React.useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());

  const {
    monthIndex,
    selectedLabel,
    setSelectedLabel,
    savedEvents,
    selectedDay,
    setSelectedDay,
  } = React.useContext(GlobalContext);

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  };

  React.useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  React.useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function getCurrentDayClass(day) {
    const dayEvents = savedEvents.filter(
      (evt) =>
        (dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY") ||
          (evt.isRecurring && dayjs(evt.day).date() === day.date())) &&
        (selectedLabel ? evt.labelId === selectedLabel.id : true)
    );
    if (day.format("DD-MM-YY") === dayjs().format("DD-MM-YY"))
      return "bg-blue-600 text-white border-2 border-transparent rounded-full";
    else if (day.format("DD-MM-YY") === selectedDay.format("DD-MM-YY"))
      return "bg-blue-100 text-blue-600 border-2 border-transparent rounded-full";
    else if (dayEvents.length)
      return `bg-${
        getLableClass(dayEvents[0].labelId).color
      }-100 border-2 border-${
        getLableClass(dayEvents[0].labelId).color
      }-300 rounded-full`;
    else return "border-2 border-transparent";
  }

  function isSameMonthClass(day) {
    if (day.month() !== currentMonthIdx % 12) return "text-gray-400";
  }

  return (
    <div className="bg-white shadow-md p-4 rounded">
      <header className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth}>
          <IoChevronBack size={18} color="#000000" />
        </button>
        <p className="text-gray-700 text-sm font-semibold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <button onClick={handleNextMonth}>
          <IoChevronForward size={18} color="#000000" />
        </button>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 gap-1 mb-5">
        {currentMonth[0].map((day, i) => (
          <span
            className="text-sm font-medium py-1 text-center text-gray-500"
            key={i}
          >
            {day.format("dd")}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                className={`py-0.5 w-full ${getCurrentDayClass(day)}`}
                onClick={() => {
                  setSelectedDay(day);
                }}
              >
                <span
                  className={`text-sm font-medium ${isSameMonthClass(day)}`}
                >
                  {day.format("D")}
                </span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="w-full h-0.5 bg-gray-300" />
      <div className="mt-5 flex flex-wrap gap-2">
        {labelsClasses.map((lblClass) => (
          <span
            key={lblClass.id}
            className={`flex items-center gap-2 py-1 px-3 text-white text-xs rounded-full cursor-pointer ${
              selectedLabel?.id === lblClass.id
                ? `bg-${lblClass.color}-500`
                : `bg-${lblClass.color}-400`
            }`}
            onClick={() =>
              setSelectedLabel(
                selectedLabel?.id === lblClass.id ? null : lblClass
              )
            }
          >
            {lblClass.title}
            {selectedLabel?.id === lblClass.id && (
              <IoCheckmarkSharp size={16} color={`#ffffff`} />
            )}
          </span>
        ))}
      </div>
      <div className="mt-4 w-2/3 h-1 bg-gray-400 mx-auto rounded-full" />
    </div>
  );
}

export default React.memo(SmallCalender);
