import useCalendarStore from "@/hooks/useCalendarStore";
import { getMonth } from "@/utils/calendar";
import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import Month from "./Month";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setMonthIndex } = useCalendarStore();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

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
