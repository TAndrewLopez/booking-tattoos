import { type Appointment } from "@/types";
import type { Dispatch, SetStateAction } from "react";
import Input from "../../Form/Inputs/Input";

interface ContactSectionProps {
  data: Appointment;
  editEnabled: boolean;
  name: string;
  preferredPronouns: string;
  email: string;
  number: string;
  setName: Dispatch<SetStateAction<string>>;
  setPreferredPronouns: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setNumber: Dispatch<SetStateAction<string>>;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  editEnabled,
  name,
  preferredPronouns,
  email,
  number,
  setName,
  setPreferredPronouns,
  setEmail,
  setNumber,
}) => {
  return (
    <section className="space-y-2 p-3">
      <Input
        id="Name"
        label="Name"
        disabled={!editEnabled}
        value={name}
        onChange={(evt) => {
          setName(evt.target.value);
        }}
      />
      <Input
        id="Pronouns"
        label="Preferred Pronouns"
        disabled={!editEnabled}
        value={preferredPronouns}
        onChange={(evt) => {
          setPreferredPronouns(evt.target.value);
        }}
      />
      <Input
        id="Email"
        label="Email"
        disabled={!editEnabled}
        value={email}
        onChange={(evt) => {
          setEmail(evt.target.value);
        }}
      />
      <Input
        id="Number"
        label="Phone Number"
        disabled={!editEnabled}
        value={number}
        onChange={(evt) => {
          setNumber(evt.target.value);
        }}
      />
    </section>
  );
};

export default ContactSection;
