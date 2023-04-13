import { type Appointment } from "@/types";
import { create } from "zustand";

export interface AppointmentModalInterface {
  isOpen: boolean;
  selectedAppointment: null | Appointment;
  openModal: () => void;
  closeModal: () => void;
  setSelectedAppointment: (appointment: Appointment) => void;
}

const useAppointmentModal = create<AppointmentModalInterface>((set) => ({
  isOpen: false,
  selectedAppointment: null,
  openModal: () =>
    set({
      isOpen: true,
    }),
  closeModal: () =>
    set({
      isOpen: false,
      selectedAppointment: null,
    }),
  setSelectedAppointment: (appointment: Appointment) =>
    set({
      selectedAppointment: appointment,
    }),
}));

export default useAppointmentModal;
