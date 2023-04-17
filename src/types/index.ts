import { type RouterOutputs } from "@/utils/api";
import { type Dispatch, type SetStateAction } from "react";

export type Appointment = RouterOutputs["appointment"]["getAll"][0];
export type AppointmentNote = RouterOutputs["appointmentNotes"]["create"];
export type CalendarEvent = RouterOutputs["calendarEvents"]["getAll"][0];
export type LabelObj = { label: string; checked: boolean };

export type ContactInputs = {
  name: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  preferredPronouns: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  email: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  number: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
};

export type TattooInputs = {
  description: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  size: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  placement: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  color: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
};

export type AppointmentInputs = {
  consultation: {
    value: boolean;
    set: Dispatch<SetStateAction<boolean>>;
  };
  accepted: {
    value: boolean | null;
    set: Dispatch<SetStateAction<boolean | null>>;
  };
  consultationDate: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  sessions: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  deposit: {
    value: boolean;
    set: Dispatch<SetStateAction<boolean>>;
  };
  image: {
    value: File | null;
    set: Dispatch<SetStateAction<File | null>>;
  };
};

export type NoteInputs = {
  notes: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
};
