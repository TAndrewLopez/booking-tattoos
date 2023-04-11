import moment from "moment";
import { create } from "zustand";

export interface CalendarStoreInterface {
  monthIndex: number;
  setMonthIndex: (val: number) => void;
}

const useCalendarStore = create<CalendarStoreInterface>((set) => ({
  monthIndex: moment().month(),
  setMonthIndex: (val: number) =>
    set({
      monthIndex: val,
    }),
}));

export default useCalendarStore;
