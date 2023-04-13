import useCalendarStore from "@/hooks/useCalendarStore";

const CalendarLabels = () => {
  const { labels, setLabels } = useCalendarStore();

  return (
    <>
      <p className="mt-10 font-bold text-gray-500">Labels</p>
      {labels.map(({ label: lbl, checked }, i) => (
        <label
          className="mt-3 flex items-center rounded bg-indigo-500 px-2 py-1"
          key={i}
        >
          <input
            type="checkbox"
            className={`h-5 w-5 text-${lbl}-400 cursor-pointer rounded focus:ring-0`}
          />
          <span className="ml-2 capitalize text-white">{lbl}</span>
        </label>
      ))}
    </>
  );
};

export default CalendarLabels;
