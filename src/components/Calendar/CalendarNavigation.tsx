import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface CalendarNavigationProps {
  lightText?: boolean;
  handleResetMonth?: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  lightText,
  handleResetMonth,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
    <>
      {handleResetMonth && (
        <button
          onClick={handleResetMonth}
          className={`mr-5 rounded border-2 px-2 py-1 text-sm duration-300 ease-in-out hover:shadow-2xl md:px-4 md:py-2
          ${
            lightText
              ? "border-white/70 text-white/70 hover:bg-white/70 hover:text-blue-500"
              : "border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white/70"
          }
          `}
        >
          Today
        </button>
      )}

      <button
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-300 ease-in-out
        ${
          lightText
            ? "border-white/70 text-white/70 hover:bg-white/70 hover:text-blue-500"
            : "border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white/70"
        }`}
        onClick={handlePrevMonth}
      >
        <BiChevronLeft size={30} />
      </button>

      <button
        className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full duration-300 ease-in-out
        ${
          lightText
            ? "border-white/70 text-white/70 hover:bg-white/70 hover:text-blue-500"
            : "border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white/70"
        }`}
        onClick={handleNextMonth}
      >
        <BiChevronRight size={30} />
      </button>
    </>
  );
};

export default CalendarNavigation;
