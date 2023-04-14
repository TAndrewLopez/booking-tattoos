import useCalendarStore from "@/hooks/useCalendarStore";
import { type LabelObj } from "@/types";
import { api } from "@/utils/api";
import { useCallback, useEffect } from "react";

const CalendarLabels = () => {
  const { data: calEvents } = api.calendarEvents.getAll.useQuery();
  const { labels, setLabels, updateLabel } = useCalendarStore();

  const handleUpdateLabel = useCallback(
    (updatedLabel: LabelObj) => {
      updateLabel(
        labels.map((lbl) =>
          lbl.label === updatedLabel.label ? updatedLabel : lbl
        )
      );
    },
    [labels, updateLabel]
  );

  useEffect(() => {
    if (!calEvents) return;
    setLabels(calEvents);
  }, [calEvents, setLabels]);

  return (
    <>
      <p className="mt-10 font-bold text-gray-500">Labels</p>
      {labels.map(({ label: lbl, checked }, i) => (
        <label
          className={`mt-3 flex items-center rounded bg-${lbl}-500 px-2 py-1`}
          key={i}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              handleUpdateLabel({ label: lbl, checked: !checked })
            }
            className={`h-5 w-5 cursor-pointer rounded focus:ring-0`}
          />
          <span className="ml-2 capitalize text-white">{lbl}</span>
        </label>
      ))}
    </>
  );
};

export default CalendarLabels;
