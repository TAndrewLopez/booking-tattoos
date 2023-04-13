import moment from "moment";
import { create } from "zustand";

type LabelObj = {
  label: string;
  checked: boolean;
};

export interface CalendarStoreInterface {
  monthIndex: number;
  daySelected: moment.Moment;
  labels: LabelObj[];
  setMonthIndex: (val: number) => void;
  setDaySelected: (day: moment.Moment) => void;
  setLabels: (selectedLabels: LabelObj[]) => void;
}

const useCalendarStore = create<CalendarStoreInterface>((set) => ({
  monthIndex: moment().month(),
  daySelected: moment(),
  labels: [],
  setMonthIndex: (val: number) =>
    set({
      monthIndex: val,
    }),
  setDaySelected: (day) =>
    set({
      daySelected: day,
    }),
  setLabels: (selectedLabels: LabelObj[]) => {
    set({
      labels: selectedLabels,
    });
  },
}));

export default useCalendarStore;
