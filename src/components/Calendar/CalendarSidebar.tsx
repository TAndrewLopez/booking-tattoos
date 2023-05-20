import CalendarLabels from "./CalendarLabels";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import FromLeftSidebar from "../AnimatedContainers/FromLeftSidebar";

interface CalendarSidebarProps {
  lightText?: boolean;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ lightText }) => {
  return (
    <FromLeftSidebar>
      <div className="w-full rounded-xl bg-white bg-opacity-60 p-6 backdrop-blur-lg backdrop-filter">
        <CreateEventButton lightText={lightText} />
        <SmallCalendar lightText={lightText} />
        <CalendarLabels lightText={lightText} />
      </div>
    </FromLeftSidebar>
  );
};

export default CalendarSidebar;
