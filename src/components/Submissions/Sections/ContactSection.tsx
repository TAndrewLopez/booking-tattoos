import React, { useEffect } from "react";
import Input from "../../Form/Inputs/Input";
import { type Appointment, type ContactInputs } from "@/types";

interface ContactSectionProps {
  data: Appointment;
  editEnabled: boolean;
  inputs: ContactInputs;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  data,
  editEnabled,
  inputs: { name, preferredPronouns, email, number },
}) => {
  // INITIAL VALUES
  useEffect(() => {
    name.set(data.name);
    preferredPronouns.set(data.preferredPronouns);
    email.set(data.email);
    number.set(data.phoneNumber);
  }, [
    data.name,
    data.preferredPronouns,
    data.email,
    data.phoneNumber,
    name,
    preferredPronouns,
    email,
    number,
  ]);

  return (
    <section className="space-y-2 p-3">
      <Input
        id="Name"
        label="Name"
        disabled={!editEnabled}
        value={name.value}
        onChange={(evt) => {
          name.set(evt.target.value);
        }}
      />
      <Input
        id="Pronouns"
        label="Preferred Pronouns"
        disabled={!editEnabled}
        value={preferredPronouns.value}
        onChange={(evt) => {
          preferredPronouns.set(evt.target.value);
        }}
      />
      <Input
        id="Email"
        label="Email"
        disabled={!editEnabled}
        value={email.value}
        onChange={(evt) => {
          email.set(evt.target.value);
        }}
      />
      <Input
        id="Number"
        label="Phone Number"
        disabled={!editEnabled}
        value={number.value}
        onChange={(evt) => {
          number.set(evt.target.value);
        }}
      />
    </section>
  );
};

export default ContactSection;
