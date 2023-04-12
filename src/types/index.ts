import { type RouterOutputs } from "@/utils/api";

export type AppointmentData = RouterOutputs["appointment"]["getAll"][0];
export type CalendarEvent = RouterOutputs["calendarEvents"]["getAll"][0];
