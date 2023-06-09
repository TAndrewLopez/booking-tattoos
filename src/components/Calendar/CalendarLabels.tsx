import useCalendarStore from "@/hooks/global/useCalendarStore";
import { type LabelObj } from "@/types";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

interface CalendarLabelsProps {
  lightText?: boolean;
}

const CalendarLabels = ({ lightText }: CalendarLabelsProps) => {
  const { data: sessionData } = useSession();
  const { data: calEvents } = api.calendarEvents.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const { labels, setLabels, updateLabel } = useCalendarStore();
  const [editEnabled, setEditEnabled] = useState(false);

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
      <div className="mt-10 flex items-center justify-between">
        <p
          className={`font-bold text-gray-500
        ${lightText ? "text-white/70" : "text-neutral-700/70"}
        `}
        >
          Labels
        </p>
        <p
          onClick={() => setEditEnabled(!editEnabled)}
          className="cursor-pointer text-sm text-blue-500 hover:text-blue-700 hover:underline"
        >
          {editEnabled ? "Done" : "Edit"}
        </p>
      </div>
      {labels.map(({ label: lbl, checked }, i) => (
        <label
          className={`mt-3 flex items-center rounded bg-${lbl}-200 cursor-pointer px-2 py-1`}
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
          <span className="ml-2 capitalize text-neutral-700">{lbl}</span>
        </label>
      ))}
    </>
  );
};

export default CalendarLabels;
