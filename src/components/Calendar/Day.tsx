import useAppointmentModal from "@/hooks/useAppointmentModal";
import useCalendarStore from "@/hooks/useCalendarStore";
import useEventModal from "@/hooks/useEventModal";
import { api } from "@/utils/api";
import moment from "moment";
import { useMemo } from "react";

interface DayProps {
  day: moment.Moment;
  rowIndex: number;
}

// TODO: DISPLAY CALENDAR EVENTS, CONSULTATION APTS, AND TATTOO APTS
// TODO: SHOW CONFLICTS FOR ALREADY SCHEDULE APTS

const Day: React.FC<DayProps> = ({ day, rowIndex }) => {
  const { labels, setDaySelected } = useCalendarStore();
  const { openModal: openEventModal, setSelectedEvent } = useEventModal();
  const { setSelectedAppointment } = useAppointmentModal();

  // EVENTS FROM DATABASE
  const { data: calendarEvents } = api.calendarEvents.getAll.useQuery();
  const { data: consultations } = api.appointment.getConsultations.useQuery();

  const filteredCalEvents = useMemo(() => {
    if (!calendarEvents) return null;
    return calendarEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.label)
    );
  }, [labels, calendarEvents]);

  const daysConsultation = useMemo(() => {
    return consultations?.filter(
      (evt) =>
        moment(evt.consultationDate).format("MM-DD-YY") ===
        day.format("MM-DD-YY")
    );
  }, [consultations, day]);

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
          openEventModal();
        }}
      >
        {daysConsultation?.map((aptEvt) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="mb-1 mr-3 truncate rounded bg-orange-200 p-1 text-sm text-gray-600"
            key={aptEvt.id}
          >
            {`${aptEvt.name} Consultation`}
          </div>
        ))}

        {daysCalEvents?.map((calEvt) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(calEvt);
              openEventModal();
            }}
            className={`bg-${calEvt.label}-200 mb-1 mr-3 truncate rounded p-1 text-sm text-gray-600`}
            key={calEvt.id}
          >
            {calEvt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
