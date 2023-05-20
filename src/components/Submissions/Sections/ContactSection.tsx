import type { Dispatch, SetStateAction } from "react";
import Input from "../../Inputs/Input";
import { formatPhoneNumber } from "@/utils/validation";
import SubSection from "./SubSection";

interface ContactSectionProps {
  editEnabled: boolean;
  contactState: {
    name: string;
    preferredPronouns: string;
    email: string;
    phoneNumber: string;
  };
  setContactState: Dispatch<
    SetStateAction<{
      name: string;
      preferredPronouns: string;
      email: string;
      phoneNumber: string;
    }>
  >;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  editEnabled,
  contactState: { name, preferredPronouns, email, phoneNumber },
  setContactState,
}) => {
  return (
    <SubSection>
      <Input
        id="Name"
        label="Name"
        disabled={!editEnabled}
        value={name}
        onChange={({ target }) =>
          setContactState((prev) => ({ ...prev, name: target.value }))
        }
      />
      <Input
        id="Pronouns"
        label="Preferred Pronouns"
        disabled={!editEnabled}
        value={preferredPronouns}
        onChange={({ target }) =>
          setContactState((prev) => ({
            ...prev,
            preferredPronouns: target.value,
          }))
        }
      />
      <Input
        id="Email"
        label="Email"
        disabled={!editEnabled}
        value={email}
        onChange={({ target }) =>
          setContactState((prev) => ({ ...prev, email: target.value }))
        }
      />
      <Input
        id="Number"
        label="Phone Number"
        disabled={!editEnabled}
        value={!editEnabled ? formatPhoneNumber(phoneNumber) : phoneNumber}
        onChange={({ target }) =>
          setContactState((prev) => ({ ...prev, phoneNumber: target.value }))
        }
      />
    </SubSection>
  );
};

export default ContactSection;
