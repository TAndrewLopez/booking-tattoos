import { type RouterOutputs } from "@/utils/api";

export type Appointment = RouterOutputs["appointment"]["getAll"][0];
export type AppointmentNote = RouterOutputs["appointmentNotes"]["create"];
export type CalendarEvent = RouterOutputs["calendarEvents"]["getAll"][0];
export type LabelObj = { label: string; checked: boolean };
export type FilterConditions = {
  [key: string]: (apt: Appointment, value: string) => boolean;
};

export type AppointmentStateInterface = {
  accepted: boolean | null;
  consultation: boolean;
  sessions: string;
  sessionDates: string[];
  consultationDate: string;
  deposit: boolean;
  reason: string;
  referral: string;
};
