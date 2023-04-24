import { type RouterOutputs } from "@/utils/api";

export type Appointment = RouterOutputs["appointment"]["getAll"][0];
export type AppointmentNote = RouterOutputs["appointmentNotes"]["create"];
export type CalendarEvent = RouterOutputs["calendarEvents"]["getAll"][0];

export type LabelObj = { label: string; checked: boolean };

export type FilterCondition = {
  [key: string]: (apt: Appointment, value: string) => boolean;
};

type AppointmentItem = {
  id?: string;
  date: string;
  type: string;
};

export type AppointmentStateInterface = {
  accepted: boolean | null;
  requiresConsultation: boolean;
  consultationDate: string;
  sessions: string;
  appointmentDates: AppointmentItem[];
  deposit: boolean;
  reason: string;
  referral: string;
};
