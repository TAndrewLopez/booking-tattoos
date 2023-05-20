import useCalendarStore from "@/hooks/global/useCalendarStore";
import { getMonth } from "@/utils/calendar";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CalendarNavigation from "./CalendarNavigation";

interface SmallCalendarProps {
  lightText?: boolean;
}

const SmallCalendar: React.FC<SmallCalendarProps> = ({ lightText }) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(moment().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setMonthIndex, daySelected, setDaySelected } =
    useCalendarStore();

  const handlePrevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };
  const handleNextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  const getCurrentDayClass = (day: moment.Moment) => {
    const format = "DD-MM-YY";
    const today = moment().format(format);
    const currDay = day.format(format);
    const selDay = daySelected && daySelected.format(format);

    if (today === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === selDay) {
      return " bg-blue-100 rounded-full text-neutral-700 font-semibold";
    } else {
      return lightText ? "text-white/70" : "text-neutral-700/70";
    }
  };

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  return (
    <div className="mt-9">
      <header className="flex items-center justify-between">
        <p
          className={`text-sm font-semibold
          ${lightText ? "text-white/70" : "text-neutral-700/70"}
        `}
        >
          {moment(new Date(moment().year(), currentMonthIndex)).format(
            "MMMM YYYY"
          )}
        </p>
        <div className="flex">
          <CalendarNavigation
            lightText={lightText}
            handlePrevMonth={handlePrevMonth}
            handleNextMonth={handleNextMonth}
          />
        </div>
      </header>
      <div
        className={`grid grid-cols-7 grid-rows-6 font-semibold
        ${lightText ? "text-white" : "text-neutral-700"}
      `}
      >
        {currentMonth[0]?.map((day, i) => (
          <span className="py-1 text-center text-sm" key={i}>
            {day.format("dd").charAt(0)}
          </span>
        ))}

        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                onClick={() => {
                  setMonthIndex(currentMonthIndex);
                  setDaySelected(day);
                }}
                className={`w-full py-1 ${getCurrentDayClass(day)}`}
                key={idx}
              >
                <span className="text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;
