import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface NavigateCalendarProps {
  handleResetMonth?: () => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

const NavigateCalendar: React.FC<NavigateCalendarProps> = ({
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

export default NavigateCalendar;
