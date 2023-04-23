import { type CalendarEvent, type LabelObj } from "@/types";
import moment from "moment";
import { create } from "zustand";

export interface CalendarStoreInterface {
  monthIndex: number;
  weekIndex: number;
  daySelected: moment.Moment;
  labels: LabelObj[];
  setMonthIndex: (val: number) => void;
  setDaySelected: (day: moment.Moment) => void;
  setLabels: (array: CalendarEvent[]) => void;
  updateLabel: (array: LabelObj[]) => void;
}

const useCalendarStore = create<CalendarStoreInterface>((set) => ({
  monthIndex: moment().month(),
  weekIndex: moment().week(),
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
  setLabels: (array: CalendarEvent[]) =>
    set(({ labels }) => {
      return {
        labels: [...new Set(array.map((evt) => evt.label))].map((label) => {
          const currentLabel = labels.find((lbl) => lbl.label === label);
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }),
      };
    }),
  updateLabel: (array: LabelObj[]) =>
    set({
      labels: array,
    }),
}));

export default useCalendarStore;
