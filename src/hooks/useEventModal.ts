import { type CalendarEvent } from "@/types";
import { create } from "zustand";

interface EventModalInterface {
  isOpen: boolean;
  selectedEvent: null | CalendarEvent;
  openModal: () => void;
  closeModal: () => void;
  setSelectedEvent: (event: CalendarEvent) => void;
}

const useEventModal = create<EventModalInterface>((set) => ({
  isOpen: false,
  selectedEvent: null,
  openModal: () =>
    set({
      isOpen: true,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      selectedEvent: null,
    }),
  setSelectedEvent: (event: CalendarEvent) =>
    set({
      selectedEvent: event,
    }),
}));

export default useEventModal;
