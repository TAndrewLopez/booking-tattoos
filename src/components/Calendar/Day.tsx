import useCalendarStore from "@/hooks/global/useCalendarStore";
import useEventModal from "@/hooks/global/useEventModal";
import useLayout from "@/hooks/global/useLayout";
import { api } from "@/utils/api";
import moment from "moment";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

interface DayProps {
  lightText?: boolean;
  day: moment.Moment;
  rowIndex: number;
}

// TODO: DISPLAY CALENDAR EVENTS, CONSULTATION APTS, AND TATTOO APTS
// TODO: SHOW CONFLICTS FOR ALREADY SCHEDULE APTS

const Day: React.FC<DayProps> = ({ lightText, day, rowIndex }) => {
  const { data: sessionData } = useSession();
  const { data: calendarEvents } = api.calendarEvents.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const { labels, setDaySelected } = useCalendarStore();
  const { openModal: openEventModal, setSelectedEvent } = useEventModal();
  const { isMobile } = useLayout();

  const filteredCalEvents = useMemo(() => {
    if (!calendarEvents) return null;
    return calendarEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [labels, calendarEvents]);

  const daysCalEvents = useMemo(() => {
    return filteredCalEvents?.filter(
      (evt) => moment(evt.date).format("MM-DD-YY") === day.format("MM-DD-YY")
    );
  }, [filteredCalEvents, day]);

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === moment().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  return (
    <div
      className={`flex flex-col border  pb-2
      ${lightText ? "border-white/30" : "border-neutral-700/30"}
    `}
    >
      <header className="flex flex-col items-center">
        {rowIndex === 0 && (
          <p
            className={`mt-1 rounded px-1 py-px font-openSans text-xs font-semibold md:px-2
            ${
              lightText
                ? "bg-white/70 text-blue-400 "
                : "bg-neutral-700 text-white/70"
            }`}
          >
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`my-1 p-1 text-center text-sm 
          ${lightText ? "text-white/70" : ""}
          ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className={`flex-1 cursor-pointer
        ${isMobile ? "flex items-center justify-center" : ""}
        `}
        onClick={() => {
          setDaySelected(day);
          openEventModal();
        }}
      >
        {isMobile &&
          daysCalEvents?.map((calEvt, i) =>
            i < 1 ? (
              <div
                key={calEvt.id}
                className={`rounded-full p-1.5 ${
                  lightText ? "bg-white/50" : "bg-neutral-700/50"
                }`}
              ></div>
            ) : (
              <React.Fragment key={calEvt.id}></React.Fragment>
            )
          )}
        {!isMobile &&
          daysCalEvents?.map((calEvt) => (
            <div
              key={calEvt.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(calEvt);
                openEventModal();
              }}
              className={`bg-${calEvt.label}-200 truncate text-sm text-gray-600 
            ${isMobile ? "h-4 w-4 rounded-full" : "mx-1.5 mb-1 rounded p-1"}
            `}
            >
              <>
                {calEvt.title}
                <br />
              </>
              <p className="truncate">
                {calEvt.date.toLocaleTimeString().slice(0, 5)}{" "}
                {calEvt.date.toLocaleTimeString().slice(-2)}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Day;
