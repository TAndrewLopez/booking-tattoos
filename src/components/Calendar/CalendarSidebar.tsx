import CalendarLabels from "./CalendarLabels";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

const CalendarSidebar = () => {
  return (
    <aside className="w-64 border p-5">
      <CreateEventButton />
      <SmallCalendar />
      <CalendarLabels />
    </aside>
  );
};

export default CalendarSidebar;
