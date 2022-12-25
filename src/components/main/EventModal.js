import React from "react";
import GlobalContext from "../../context/GlobalContext";
import { addItem, deleteItem, updateItem } from "../../firebase/FirebaseUtil";
import { EVENTS_ACTION, labelsClasses } from "../../util";
import {
  IoBookmarksOutline,
  IoCheckmarkSharp,
  IoCloseOutline,
  IoCreateOutline,
  IoDocumentAttachOutline,
  IoTodayOutline,
} from "react-icons/io5";

export default function EventModal() {
  const {
    user,
    setShowEventModal,
    selectedDay,
    dispatchCalEvent,
    selectedEvent,
    setShowLoading,
    setToastMessage,
  } = React.useContext(GlobalContext);

  const [title, setTitle] = React.useState(
    selectedEvent ? selectedEvent.title : ""
  );
  const [description, setDescription] = React.useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [notes, setNotes] = React.useState(
    selectedEvent ? selectedEvent.notes : ""
  );
  const [isRecurring, setIsRecurring] = React.useState(
    selectedEvent ? selectedEvent.isRecurring : false
  );
  const [selectedLabel, setSelectedLabel] = React.useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl.id === selectedEvent.labelId)
      : labelsClasses[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // if title is empty
    if (!title) {
      setToastMessage("Event title empty!");
      return;
    }

    setShowLoading(true);

    const calenderEvent = {
      title,
      description,
      notes,
      labelId: selectedLabel.id,
      day: selectedDay.valueOf(),
      isRecurring,
    };

    // if user is logged in
    if (user) {
      // if event is a selected/already created event
      if (selectedEvent) {
        updateItem(
          `plannerOrganizingAppUsers/${user.id}/events`,
          selectedEvent.id,
          {
            title,
            description,
            notes,
            labelId: selectedLabel.id,
            isRecurring,
          }
        )
          .then((res) => {
            dispatchCalEvent({
              type: EVENTS_ACTION.UPDATE,
              payload: { id: selectedEvent.id, ...calenderEvent },
            });
            setShowEventModal(false);
            setToastMessage("Event updated successfully.");
          })
          .catch((error) => {
            setToastMessage("Error in updating event. Please try again.");
          })
          .finally(() => setShowLoading(false));
      } else {
        // adding new event
        addItem(`plannerOrganizingAppUsers/${user.id}/events`, calenderEvent)
          .then((docRef) => {
            dispatchCalEvent({
              type: EVENTS_ACTION.PUSH,
              payload: { id: docRef.id, ...calenderEvent },
            });
            setShowEventModal(false);
            setToastMessage("Event added successfully.");
          })
          .catch((error) => {
            setToastMessage("Error in adding event. Please try again.");
          })
          .finally(() => setShowLoading(false));
      }
    } else {
      // user is not logged in
      let events = JSON.parse(localStorage.getItem("local-events"));

      // if event is a selected/already created event
      if (selectedEvent) {
        events.forEach((ev) => {
          if (ev.id === selectedEvent.id) {
            ev.title = title;
            ev.description = description;
            ev.notes = notes;
            ev.labelId = selectedLabel.id;
            ev.isRecurring = isRecurring;
          }
        });
        localStorage.setItem("local-events", JSON.stringify(events));
        dispatchCalEvent({
          type: EVENTS_ACTION.UPDATE,
          payload: { id: selectedEvent.id, ...calenderEvent },
        });
        setToastMessage("Event updated successfully.");
      } else {
        // adding new event
        const _calenderEvent = {
          id: new Date().getTime().toString(),
          ...calenderEvent,
        };
        if (events) events.push(_calenderEvent);
        else events = [_calenderEvent];
        localStorage.setItem("local-events", JSON.stringify(events));
        dispatchCalEvent({
          type: EVENTS_ACTION.PUSH,
          payload: _calenderEvent,
        });
        setToastMessage("Event added successfully.");
      }
      setShowEventModal(false);
      setShowLoading(false);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setShowLoading(true);
    if (user) {
      deleteItem(
        `plannerOrganizingAppUsers/${user.id}/events`,
        selectedEvent.id
      )
        .then((res) => {
          dispatchCalEvent({
            type: EVENTS_ACTION.DELETE,
            payload: selectedEvent,
          });
          setToastMessage("Event deleted successfully.");
          setShowEventModal(false);
        })
        .catch((error) => {
          setToastMessage("Error in deleting event. Please try again.");
        })
        .finally(() => {
          setShowLoading(false);
        });
    } else {
      const events = JSON.parse(localStorage.getItem("local-events"));
      const updatedEvents = events.filter((ev) => ev.id !== selectedEvent.id);
      localStorage.setItem("local-events", JSON.stringify(updatedEvents));
      dispatchCalEvent({ type: EVENTS_ACTION.DELETE, payload: selectedEvent });
      setToastMessage("Event deleted successfully.");
      setShowEventModal(false);
      setShowLoading(false);
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <form className="bg-white rounded-lg overflow-hidden shadow-2xl w-11/12 sm:w-9/12 md:w-6/12 lg:w-4/12">
        <header className="bg-gray-100 px-4 py-3 flex justify-end items-center">
          <div className="flex items-center gap-5">
            <button onClick={() => setShowEventModal(false)}>
              <IoCloseOutline size={22} color="#000000" />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-start gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Add title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-2 border-0 text-gray-600 text-xl font-semibold w-full border-b-2 border-gray-200 outline-none focus:ring-0 focus:border-blue-200"
            />
            <IoTodayOutline
              size={20}
              color="#000000"
              className="justify-self-center self-center"
            />
            <div className="flex items-center justify-between">
              <p>{selectedDay.format("dddd, MMMM DD")}</p>
              <p className="flex gap-2 items-center pr-5">
                <input
                  className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 outline-none focus:ring-0 transition duration-200 bg-no-repeat bg-center bg-contain cursor-pointer"
                  type="checkbox"
                  checked={isRecurring}
                  onChange={() => setIsRecurring(!isRecurring)}
                />
                <span className="text-sm">Recurring</span>
              </p>
            </div>
            <IoCreateOutline
              size={22}
              color="#000000"
              className="justify-self-center self-center"
            />
            <input
              type="text"
              name="description"
              id="description"
              placeholder="Add a description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="py-2 border-0 text-gray-600 w-full border-b-2 border-gray-200 outline-none focus:ring-0 focus:border-blue-200"
            />
            <IoBookmarksOutline
              size={20}
              color="#000000"
              className="justify-self-center self-center"
            />
            <div className="flex flex-wrap gap-2">
              {labelsClasses.map((lblClass) => (
                <span
                  key={lblClass.id}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`flex gap-2 py-1 px-3 rounded-full text-white text-sm items-center cursor-pointer ${
                    selectedLabel.id === lblClass.id
                      ? `bg-${lblClass.color}-500`
                      : `bg-${lblClass.color}-400`
                  }`}
                >
                  {lblClass.title}
                  {selectedLabel.id === lblClass.id && (
                    <IoCheckmarkSharp size={16} color={`#ffffff`} />
                  )}
                </span>
              ))}
            </div>
            {selectedEvent && (
              <>
                <IoDocumentAttachOutline
                  size={22}
                  color="#000000"
                  className="justify-self-center self-center"
                />
                <textarea
                  type="text"
                  name="notes"
                  id="notes"
                  placeholder="Add note"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="pt-3 max-h-60 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 outline-none focus:ring-0 focus:border-blue-200"
                />
              </>
            )}
          </div>
        </div>
        <footer className="flex gap-2 justify-end w-full border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded text-white text-sm"
          >
            {selectedEvent ? "Update" : "Save"}
          </button>
          {selectedEvent && (
            <button
              onClick={handleDelete}
              className="bg-white hover:bg-gray-100 px-5 py-2 rounded border-blue-500 border-2 text-blue-600 text-sm"
            >{`Delete`}</button>
          )}
        </footer>
      </form>
    </div>
  );
}
