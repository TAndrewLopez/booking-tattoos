import { create } from "zustand";

export interface LoginModalInterface {
  email: string;
  password: string;
  inputError: string;
  setInputError: (val: string) => void;
  isOpen: boolean;
  setValue: (key: string, val: string) => void;
  showModal: () => void;
  hideModal: () => void;
}

const useLoginModal = create<LoginModalInterface>((set) => ({
  email: "",
  password: "",
  inputError: "",
  setInputError: (val: string) =>
    set({
      inputError: val,
    }),
  isOpen: false,
  setValue: (key: string, val: string) =>
    set(() => ({
      [key]: val,
    })),
  showModal: () =>
    set(() => ({
      isOpen: true,
    })),
  hideModal: () =>
    set(() => ({
      isOpen: false,
    })),
}));

export default useLoginModal;
