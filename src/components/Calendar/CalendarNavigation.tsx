import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface CalendarNavigationProps {
  handleResetMonth?: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  handleResetMonth,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
    <>
      {handleResetMonth && (
        <button
          onClick={handleResetMonth}
          className="mr-5 rounded border px-4 py-2"
        >
          Today
        </button>
      )}
      <button onClick={handlePrevMonth}>
        <BiChevronLeft
          size={30}
          className="mx-2 cursor-pointer text-gray-600"
        />
      </button>
      <button onClick={handleNextMonth}>
        <BiChevronRight
          size={30}
          className="mx-2 cursor-pointer text-gray-600"
        />
      </button>
    </>
  );
};

export default CalendarNavigation;
