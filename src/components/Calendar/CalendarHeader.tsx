import useCalendarStore from "@/hooks/useCalendarStore";
import moment from "moment";
import { AiTwotoneCalendar } from "react-icons/ai";
import { RiSettings5Line } from "react-icons/ri";
import CalendarNavigation from "./CalendarNavigation";
import type { Dispatch, SetStateAction } from "react";

interface CalendarHeaderProp {
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
}

const CalendarHeader: React.FC<CalendarHeaderProp> = ({ view, setView }) => {
  const { monthIndex, setMonthIndex, setDaySelected } = useCalendarStore();

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleResetMonth = () => {
    setDaySelected(moment());
    setMonthIndex(
      monthIndex === moment().month()
        ? monthIndex + Math.random()
        : moment().month()
    );
  };

  return (
    <header className="relative flex items-center px-4 py-2">
      <AiTwotoneCalendar size={30} className="mr-2" />
      <h1 className="font-base mr-10 text-xl text-gray-500">Calendar</h1>
      <CalendarNavigation
        view={view}
        setView={setView}
        handleResetMonth={handleResetMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
      <h2 className="ml-4 text-xl font-semibold text-gray-500">
        {moment(new Date(moment().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      {/* <button className="absolute right-4">
        <RiSettings5Line size={26} />
      </button> */}
    </header>
  );
};

export default CalendarHeader;
