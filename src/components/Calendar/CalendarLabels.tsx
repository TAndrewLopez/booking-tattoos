import { type LabelObj } from "@/types";
import { api } from "@/utils/api";
import { useCallback, useEffect, useMemo, useState } from "react";

// TODO: REPLACE LOCAL STATE WITH GLOBAL STATE SO WHEN SWITCHING SCREENS, SELECTED LABELS REMAIN

const CalendarLabels = () => {
  const { data: calEvents } = api.calendarEvents.getAll.useQuery();
  const [labels, setLabels] = useState<Array<LabelObj>>([]);

  const updateLabel = useCallback(
    (updatedLabel: LabelObj) => {
      setLabels(
        labels.map((lbl) =>
          lbl.label === updatedLabel.label ? updatedLabel : lbl
        )
      );
    },
    [labels]
  );

  const filteredCalEvents = useMemo(() => {
    if (!calEvents) return null;

    return calEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [labels, calEvents]);

  useEffect(() => {
    if (!calEvents) return;
    setLabels((prevLabels) => {
      return [...new Set(calEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [calEvents]);

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
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`h-5 w-5 cursor-pointer rounded focus:ring-0`}
          />
          <span className="ml-2 capitalize text-white">{lbl}</span>
        </label>
      ))}
    </>
  );
};

export default CalendarLabels;
