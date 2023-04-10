import { AiTwotoneCalendar } from "react-icons/ai";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const CalendarHeader = () => {
  return (
    <header className="flex items-center px-4 py-2">
      <AiTwotoneCalendar size={40} className="mr-2" />
      <h1 className="mr-10 text-xl font-semibold text-gray-500">Calendar</h1>
      <button className="mr-5 rounded border px-4 py-2">Today</button>
      <button>
        <BiChevronLeft
          size={30}
          className="mx-2 cursor-pointer text-gray-600"
        />
      </button>
      <button>
        <BiChevronRight
          size={30}
          className="mx-2 cursor-pointer text-gray-600"
        />
      </button>
    </header>
  );
};

export default CalendarHeader;
