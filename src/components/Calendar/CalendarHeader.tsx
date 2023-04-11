import useCalendarStore from "@/hooks/useCalendarStore";
import moment from "moment";
import { AiTwotoneCalendar } from "react-icons/ai";
import NavigateCalendar from "./NavigateCalendar";

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useCalendarStore();

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleResetMonth = () => {
    setMonthIndex(
      monthIndex === moment().month()
        ? monthIndex + Math.random()
        : moment().month()
    );
  };

  return (
    <header className="flex items-center px-4 py-2">
      <AiTwotoneCalendar size={40} className="mr-2" />
      <h1 className="font-base mr-10 text-xl text-gray-500">Calendar</h1>
      <NavigateCalendar
        handleResetMonth={handleResetMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
      <h2 className="ml-4 text-xl font-semibold text-gray-500">
        {moment(new Date(moment().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};

export default CalendarHeader;
