import type { Dispatch, SetStateAction } from "react";
import Input from "../../Form/Inputs/Input";

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
    <section className="space-y-2 p-3">
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
        value={phoneNumber}
        onChange={({ target }) =>
          setContactState((prev) => ({ ...prev, phoneNumber: target.value }))
        }
      />
    </section>
  );
};

export default ContactSection;
