import type { Dispatch, SetStateAction } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface CalendarNavigationProps {
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
  handleResetMonth?: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigationProps> = ({
  view,
  setView,
  handleResetMonth,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
    <>
      {/* {handleResetMonth && (
        <button
          onClick={() => setView(!view)}
          className="mr-5 rounded border px-4 py-2"
        >
          {view ? "Monthly" : "Weekly"}
        </button>
      )} */}

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
