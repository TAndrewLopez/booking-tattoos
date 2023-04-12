import useCalendarStore from "@/hooks/useCalendarStore";
import { getMonth } from "@/utils/calendar";
import { useEffect, useState } from "react";
import CalendarHeader from "./CalendarHeader";
import CalendarSidebar from "./CalendarSidebar";
import Month from "./Month";
import { api } from "@/utils/api";

// TODO : STYLE FOR MOBILE VIEW

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useCalendarStore();
  const { data: consultationAppointments } =
    api.appointment.getConsultations.useQuery();
  const { data: calendarEvents } = api.calendarEvents.getAll.useQuery();

  console.log({ consultationAppointments, calendarEvents });

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
