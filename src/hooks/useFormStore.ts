import { create } from "zustand";

export interface FormStoreInterface {
  name: string;
  preferredPronouns: string;
  email: string;
  phoneNumber: string;
  description: string;
  size: string;
  placement: string;
  color: string;
  resetStore: () => void;
  setValue: (key: string, val: string) => void;
}

const useFormStore = create<FormStoreInterface>((set) => ({
  name: "",
  preferredPronouns: "",
  email: "",
  phoneNumber: "",
  description: "",
  size: "",
  placement: "",
  color: "",
  resetStore: () =>
    set(() => ({
      name: "",
      preferredPronouns: "",
      email: "",
      phoneNumber: "",
      description: "",
      size: "",
      placement: "",
      color: "",
    })),
  setValue: (key: string, val: string) =>
    set(() => ({
      [key]: val,
    })),
}));

export default useFormStore;
