import { create } from "zustand";

interface EventModalInterface {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useEventModal = create<EventModalInterface>((set) => ({
  isOpen: false,
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
