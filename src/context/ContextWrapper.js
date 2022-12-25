import dayjs from "dayjs";
import React from "react";
import GlobalContext from "./GlobalContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
import { getAllItems, getItem, setItem } from "../firebase/FirebaseUtil";
import { EVENTS_ACTION } from "../util";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case EVENTS_ACTION.PUSH:
      return [...state, payload];
    case EVENTS_ACTION.UPDATE:
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case EVENTS_ACTION.DELETE:
      return state.filter((evt) => evt.id !== payload.id);
    case EVENTS_ACTION.INITIALIZE:
      return [...payload];
    default:
      return state;
  }
}

export default function ContextWrapper({ children }) {
  const [user, setUser] = React.useState(null);
  const [initialLoading, setInitialLoading] = React.useState(true);
  const [showLoading, setShowLoading] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState(null);

  const [monthIndex, setMonthIndex] = React.useState(dayjs().month());
  const [selectedDay, setSelectedDay] = React.useState(dayjs());
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [showEventModal, setShowEventModal] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState(null);
  const [savedEvents, dispatchCalEvent] = React.useReducer(
    savedEventsReducer,
    []
  );

  const filteredEvents = React.useMemo(() => {
    return selectedLabel
      ? savedEvents.filter((evt) => evt.labelId === selectedLabel.id)
      : savedEvents;
  }, [savedEvents, selectedLabel]);

  React.useEffect(() => {
    if (selectedDay) setMonthIndex(selectedDay.month());
  }, [selectedDay]);

  React.useEffect(() => {
    !showEventModal && setSelectedEvent(null);
  }, [showEventModal]);

  React.useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          getItem("plannerOrganizingAppUsers", user.uid)
            .then((docSnap) => {
              if (docSnap.exists()) {
                setUser(docSnap.data());
                resetApp();
              } else {
                const _user = {
                  id: user.uid,
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                };
                setItem("plannerOrganizingAppUsers", user.uid, _user)
                  .then((docRef) => {
                    setUser(_user);
                    resetApp();
                  })
                  .catch((error) => {
                    setToastMessage("Error in Sign in. Please try again.");
                    setInitialLoading(false);
                    setShowLoading(false);
                  });
              }
            })
            .catch((error) => {
              setToastMessage("Network error. Please try again.");
              setInitialLoading(false);
              setShowLoading(false);
            });
        } else {
          setUser(null);
          const events = JSON.parse(localStorage.getItem("local-events"));
          dispatchCalEvent({
            type: EVENTS_ACTION.INITIALIZE,
            payload: events ? events : [],
          });
          resetApp();
        }
      }),
    []
  );

  const resetApp = () => {
    setMonthIndex(dayjs().month());
    setSelectedDay(dayjs());
    setSelectedEvent(null);
    setInitialLoading(false);
    setShowLoading(false);
  };

  React.useEffect(() => {
    if (user) {
      getAllItems(`plannerOrganizingAppUsers/${user.id}/events`)
        .then((querySnapshot) => {
          let _payload = [];
          querySnapshot.forEach((doc) => {
            _payload.push({ id: doc.id, ...doc.data() });
          });
          dispatchCalEvent({
            type: EVENTS_ACTION.INITIALIZE,
            payload: _payload,
          });
        })
        .catch((error) => {
          setToastMessage("Error in syncing events. Please try again.");
        });
    }
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        monthIndex,
        setMonthIndex,
        selectedDay,
        setSelectedDay,
        showEventModal,
        setShowEventModal,
        savedEvents,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        selectedLabel,
        setSelectedLabel,
        filteredEvents,
        initialLoading,
        showLoading,
        setShowLoading,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
