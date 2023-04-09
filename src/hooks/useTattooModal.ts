import { create } from "zustand";

export interface TattooStoreInterface {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useTattooModal = create<TattooStoreInterface>((set) => ({
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

export default useTattooModal;
