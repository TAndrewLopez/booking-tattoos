import moment from "moment";
import { create } from "zustand";

export interface CalendarStoreInterface {
  monthIndex: number;
  setMonthIndex: (val: number) => void;
  daySelected: moment.Moment | null;
  setDaySelected: (day: moment.Moment) => void;
}

const useCalendarStore = create<CalendarStoreInterface>((set) => ({
  monthIndex: moment().month(),
  setMonthIndex: (val: number) =>
    set({
      monthIndex: val,
    }),
  daySelected: moment(),
  setDaySelected: (day) =>
    set({
      daySelected: day,
    }),
}));

export default useCalendarStore;
