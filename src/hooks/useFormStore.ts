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
  setName: (val: string) => void;
  setPreferredPronouns: (val: string) => void;
  setEmail: (val: string) => void;
  setPhoneNumber: (val: string) => void;
  setDescription: (val: string) => void;
  setSize: (val: string) => void;
  setPlacement: (val: string) => void;
  setColor: (val: string) => void;
  resetStore: () => void;
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
  setName: (val: string) =>
    set(() => ({
      name: val,
    })),
  setPreferredPronouns: (val: string) =>
    set(() => ({
      preferredPronouns: val,
    })),
  setEmail: (val: string) =>
    set(() => ({
      email: val,
    })),
  setPhoneNumber: (val: string) =>
    set(() => ({
      phoneNumber: val,
    })),
  setDescription: (val: string) =>
    set(() => ({
      description: val,
    })),
  setSize: (val: string) =>
    set(() => ({
      size: val,
    })),
  setPlacement: (val: string) =>
    set(() => ({
      placement: val,
    })),
  setColor: (val: string) =>
    set(() => ({
      color: val,
    })),
}));

export default useFormStore;
