import React from "react";
import SmallCalender from "./SmallCalender";
import TodaysEvents from "./TodaysEvents";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col gap-4 md:w-56 lg:w-72">
      <SmallCalender />
      <TodaysEvents />
    </aside>
  );
}
