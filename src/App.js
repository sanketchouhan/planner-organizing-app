import React from "react";
import { getMonth } from "./util";
import CalenderHeader from "./components/header/CalenderHeader";
import Sidebar from "./components/sideBar/Sidebar";
import Month from "./components/main/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/main/EventModal";
import AppLoading from "./components/utilities/AppLoading";
import Loading from "./components/utilities/Loading";
import ToastMessage from "./components/utilities/ToastMessage";

function App() {
  const [currentMonth, setCurrentMonth] = React.useState(getMonth());
  const { monthIndex, showEventModal, initialLoading, showLoading } =
    React.useContext(GlobalContext);

  React.useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  if (initialLoading) return <AppLoading />;

  return (
    <>
      <div
        className="h-screen w-screen flex flex-col font-sans bg-gray-100"
        style={{ minWidth: "1000px" }}
      >
        <CalenderHeader />
        <div
          className="flex flex-1 gap-4 p-1 sm:p-3 md:p-5"
          style={{ height: "calc(100vh - 64px)" }}
        >
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
      <ToastMessage />
      {showLoading && <Loading />}
      {showEventModal && <EventModal />}
    </>
  );
}

export default App;
