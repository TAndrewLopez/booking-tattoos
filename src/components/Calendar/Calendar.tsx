import useCalendarStore from "@/hooks/useCalendarStore";
import { getMonth } from "@/utils/calendar";
import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import Month from "./Month";
import Week from "./Week";

// TODO : STYLE FOR MOBILE VIEW

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [view, setView] = useState(false);
  const { monthIndex } = useCalendarStore();

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="flex h-full flex-col">
      <CalendarHeader view={view} setView={setView} />
      <div className="flex flex-1">
        <CalendarSidebar />
        {view ? <Week month={currentMonth} /> : <Month month={currentMonth} />}
      </div>
    </div>
  );
};

export default Calendar;
