import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import Month from "./Month";
import CalendarSidebar from "./CalendarSidebar";
import { getMonth } from "@/utils/calendar";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  return (
    <div className="flex h-full flex-col">
      <CalendarHeader />
      <div className="flex flex-1">
        <CalendarSidebar />
        <Month month={currentMonth} />
      </div>
    </div>
  );
};

export default Calendar;
