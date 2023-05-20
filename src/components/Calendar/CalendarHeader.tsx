import useCalendarStore from "@/hooks/global/useCalendarStore";
import moment from "moment";
import { AiTwotoneCalendar } from "react-icons/ai";
import CalendarNavigation from "./CalendarNavigation";

interface CalendarHeaderProps {
  lightText?: boolean;
  headerUtility?: () => void;
  headerUtilityName: string;
}

const CalendarHeader = ({
  lightText,
  headerUtility,
  headerUtilityName,
}: CalendarHeaderProps) => {
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
    <header className="relative mb-4 flex items-center md:px-4">
      <AiTwotoneCalendar
        color={lightText ? "rgb(255 255 255 / 0.7)" : "rgb(64 64 64)"}
        size={30}
        className="mr-1.5 hidden md:block"
      />
      <h1
        className={`font-base mr-10 hidden text-xl  md:block
        ${lightText ? "text-white/70" : "text-neutral-700"}
      `}
      >
        Calendar
      </h1>
      <CalendarNavigation
        lightText={lightText}
        handleResetMonth={handleResetMonth}
        handlePrevMonth={handlePrevMonth}
        handleNextMonth={handleNextMonth}
      />
      <h2
        className={`mx-4 truncate font-semibold md:text-xl
        ${lightText ? "text-white/70" : "text-gray-700"}
      `}
      >
        {moment(new Date(moment().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
      {headerUtility && (
        <div className="flex grow justify-end">
          <button
            onClick={headerUtility}
            className={`truncate rounded border-2 px-2 py-1 text-sm duration-300 ease-in-out hover:shadow-2xl md:px-4 md:py-2
          ${
            lightText
              ? "border-white/70 text-white/70 hover:bg-white/70 hover:text-blue-500"
              : "border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white/70"
          }
          `}
          >
            {headerUtilityName}
          </button>
        </div>
      )}
    </header>
  );
};

export default CalendarHeader;
