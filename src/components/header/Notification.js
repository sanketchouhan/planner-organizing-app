import React from "react";
import GlobalContext from "../../context/GlobalContext";
import notificationLogo from "../../assets/notification.png";
import { addItem } from "../../firebase/FirebaseUtil";
import { IoSync } from "react-icons/io5";
import { EVENTS_ACTION } from "../../util";

function Notification() {
  const [newNotification, setNewNotification] = React.useState(true);
  const [showNotifocation, setShowNotifocation] = React.useState(false);
  const [showSyncBtn, setShowSyncBtn] = React.useState(false);
  const [syncInProgress, setSyncInProgress] = React.useState(false);
  const [notifocationMessage, setNotifocationMessage] = React.useState("");

  const { user, dispatchCalEvent, setToastMessage } =
    React.useContext(GlobalContext);

  React.useEffect(() => {
    const localEvents = JSON.parse(localStorage.getItem("local-events"));
    if (user && localEvents) {
      setNotifocationMessage(
        "Events are available in current browser. Sync your events for global access."
      );
      setShowSyncBtn(true);
      setNewNotification(true);
    } else if (!user) {
      setNotifocationMessage(
        "You are not logged in. Your events will be available in current browser. Recommend you to login for global access."
      );
      setShowSyncBtn(false);
      setNewNotification(true);
    } else {
      setNotifocationMessage("No new notification");
      setShowSyncBtn(false);
      setNewNotification(false);
    }
  }, [user]);

  const handleShowNotification = () => {
    setShowNotifocation(!showNotifocation);
  };

  const syncEvents = () => {
    setSyncInProgress(true);
    const localEvents = JSON.parse(localStorage.getItem("local-events"));
    let localEventsLength = localEvents.length;
    localEvents.forEach((ev) => {
      delete ev.id;
      addItem(`users/${user.id}/events`, {
        ...ev,
      }).then((doc) => {
        dispatchCalEvent({
          type: EVENTS_ACTION.PUSH,
          payload: { id: doc.id, ...ev, createdBy: user.id },
        });
        localEventsLength--;
        if (localEventsLength === 0) {
          localStorage.removeItem("local-events");
          setNewNotification(false);
          setSyncInProgress(false);
          setToastMessage("Events synced successfully.");
          setShowNotifocation(false);
          setShowSyncBtn(false);
          setNotifocationMessage("No new notification");
        }
      });
    });
  };

  const notificationStyles = newNotification
    ? "w-8 h-8 rounded-full cursor-pointer bg-red-600 p-1.5 hover:bg-red-700 transition-all"
    : "w-8 h-8 rounded-full cursor-pointer bg-gray-400 p-1.5 hover:bg-gray-500 transition-all";

  return (
    <div className="relative">
      <img
        src={notificationLogo}
        alt="notification"
        className={notificationStyles}
        onClick={handleShowNotification}
        style={{ transform: newNotification && "rotate(30deg)" }}
      />
      {showNotifocation && (
        <>
          <div
            className="fixed h-screen w-full top-0 left-0 z-40"
            onClick={() => !syncInProgress && setShowNotifocation(false)}
          />
          <div className="absolute top-10 right-0 w-56 md:w-72 p-5 bg-white rounded border shadow-lg z-50 transition-all">
            <p className="text-sm">{notifocationMessage}</p>
            {showSyncBtn && (
              <button
                type="button"
                onClick={syncEvents}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-5 py-2 mt-5 rounded text-white text-sm"
              >
                Sync
                {syncInProgress && (
                  <IoSync size={16} color="#ffffff" className="animate-spin" />
                )}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Notification;
