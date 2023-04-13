import moment from "moment";
import { create } from "zustand";

export interface CalendarStoreInterface {
  monthIndex: number;
  daySelected: moment.Moment;
  setMonthIndex: (val: number) => void;
  setDaySelected: (day: moment.Moment) => void;
}

const useCalendarStore = create<CalendarStoreInterface>((set) => ({
  monthIndex: moment().month(),
  daySelected: moment(),
  setMonthIndex: (val: number) =>
    set({
      monthIndex: val,
    }),
  setDaySelected: (day) =>
    set({
      daySelected: day,
    }),
}));

export default useCalendarStore;
