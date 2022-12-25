import React from "react";
import dayjs from "dayjs";
import GlobalContext from "../../context/GlobalContext";
import { IoCalendarOutline } from "react-icons/io5";
import { getLableClass } from "../../util";

function TodaysEvents() {
  const { setShowEventModal, savedEvents, setSelectedEvent } =
    React.useContext(GlobalContext);

  const dayEvents = React.useMemo(
    () =>
      savedEvents.filter(
        (evt) =>
          dayjs(evt.day).format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ),
    [savedEvents]
  );

  return (
    <div className="flex-1 flex flex-col bg-white shadow-md p-4 overflow-hidden rounded">
      <div className="pb-2 text-gray-700 text-center text-sm font-semibold relative">
        <IoCalendarOutline
          size={18}
          color="#000000"
          className="absolute left-0"
        />
        Today's Events
      </div>
      <div className="w-full h-0.5 bg-gray-300" />
      <div className="flex-1 mt-4 pr-1 text-gray-700 text-center text-sm overflow-auto">
        {dayEvents.length ? (
          dayEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => {
                setSelectedEvent(evt);
                setShowEventModal(true);
              }}
              className="flex items-center justify-between gap-2 py-1 cursor-pointer"
            >
              <div className="flex-1 truncate text-left font-medium">
                {evt.title}
              </div>
              <span
                className={`py-1 px-3 bg-${
                  getLableClass(evt.labelId).color
                }-500 text-white text-xs rounded-full`}
              >
                {getLableClass(evt.labelId).title}
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-sm font-semibold">
            No Event !
          </div>
        )}
      </div>
      <div className="mt-4 w-2/3 h-1 bg-gray-400 mx-auto rounded-full" />
    </div>
  );
}

export default React.memo(TodaysEvents);
