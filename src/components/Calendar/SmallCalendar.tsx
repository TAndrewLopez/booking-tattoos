import { getMonth } from "@/utils/calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import NavigateCalendar from "./NavigateCalendar";
import useCalendarStore from "@/hooks/useCalendarStore";

const SmallCalendar = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(moment().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useCalendarStore();

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  return (
    <div className="mt-9">
      <header className="flex items-center justify-between">
        <p className="font-semibold text-gray-500">
          {moment(new Date(moment().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}
        </p>
        <NavigateCalendar
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
      </header>
    </div>
  );
};

export default SmallCalendar;
