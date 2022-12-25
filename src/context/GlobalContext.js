import React from "react";

const GlobalContext = React.createContext({
  user: {},
  monthIndex: 0,
  setMonthIndex: (index) => {},
  selectedDay: null,
  setSelectedDay: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  savedEvents: [],
  dispatchCalEvent: ({ type, payload }) => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  selectedLabel: null,
  setSelectedLabel: () => {},
  filteredEvents: [],
  initialLoading: true,
  showLoading: false,
  setShowLoading: () => {},
  toastMessage: null,
  setToastMessage: () => {},
});

export default GlobalContext;
