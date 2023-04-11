import useCalendarStore from "@/hooks/useCalendarStore";
import useEventModal from "@/hooks/useEventModal";
import moment from "moment";

interface DayProps {
  day: moment.Moment;
  rowIndex: number;
}

const Day: React.FC<DayProps> = ({ day, rowIndex }) => {
  const { setDaySelected } = useCalendarStore();
  const { openModal } = useEventModal();

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === moment().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  return (
    <div className="flex flex-col border border-gray-200">
      <header className="flex flex-col items-center">
        {rowIndex === 0 && (
          <p className="mt-1 font-openSans text-xs text-gray-500">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p className={`my-1 p-1 text-center text-sm ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          openModal();
        }}
      >
        {" "}
      </div>
    </div>
  );
};

export default Day;
