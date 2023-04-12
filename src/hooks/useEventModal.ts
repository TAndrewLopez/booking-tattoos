import { create } from "zustand";

interface EventModalInterface {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  selectedEvent: null;
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
    }),
}));

export default useEventModal;
