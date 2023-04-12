import { type Appointment, type CalendarEvent } from "@/types";
import { create } from "zustand";

interface EventModalInterface {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedEvent: null | CalendarEvent;
  selectedAppointment: null | Appointment;
  setSelectedEvent: (event: CalendarEvent) => void;
  setSelectedAppointment: (appointment: Appointment) => void;
}

const useEventModal = create<EventModalInterface>((set) => ({
  isOpen: false,
  selectedEvent: null,
  selectedAppointment: null,
  openModal: () =>
    set({
      isOpen: true,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      selectedEvent: null,
      selectedAppointment: null,
    }),
  setSelectedEvent: (event: CalendarEvent) =>
    set({
      selectedEvent: event,
    }),
  setSelectedAppointment: (appointment: Appointment) =>
    set({
      selectedAppointment: appointment,
    }),
}));

export default useEventModal;
