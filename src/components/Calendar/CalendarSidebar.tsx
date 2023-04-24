import type { Dispatch, SetStateAction } from "react";
import CalendarLabels from "./CalendarLabels";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";

interface CalendarSidebarProps {
  view: boolean;
  setView: Dispatch<SetStateAction<boolean>>;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ view, setView }) => {
  return (
    <aside className="w-64 border p-5">
      <CreateEventButton />
      <SmallCalendar view={view} setView={setView} />
      <CalendarLabels />
    </aside>
  );
};

export default CalendarSidebar;
