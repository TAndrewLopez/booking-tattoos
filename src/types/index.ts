import { type RouterOutputs } from "@/utils/api";

export type Appointment = RouterOutputs["appointment"]["getAll"][0];
export type AppointmentNote = RouterOutputs["appointmentNotes"]["create"];
export type CalendarEvent = RouterOutputs["calendarEvents"]["getAll"][0];
export type LabelObj = { label: string; checked: boolean };
export type FilterConditions = {
  [key: string]: (apt: Appointment, value: string) => boolean;
};
