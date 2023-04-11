import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

const CalendarSidebar = () => {
  return (
    <aside className="w-64 border p-5">
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default CalendarSidebar;
