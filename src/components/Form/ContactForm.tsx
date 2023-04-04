import Input from "./Inputs/Input";
import Select from "./Inputs/Select";
import useAppointmentStore from "@/state/appointmentStore";

interface ContactFormProps {
  inputError?: string;
  setInputError: (val: string) => void;
  isLoading: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  inputError,
  setInputError,
  isLoading,
}) => {
  const {
    name,
    setName,
    preferredPronouns,
    setPreferredPronouns,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
  } = useAppointmentStore();

  return (
    <form className="flex flex-col gap-4">
      {/* NAME */}
      <Input
        id="Name"
        error={inputError === "Name"}
        label="Name"
        value={name}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Name") setInputError("");
          setName(evt.target.value);
        }}
      />

      {/* PREFERRED PRONOUNS */}
      <Select
        label="Select Pronouns (optional)"
        options={["he/him", "she/her", "they/them"]}
        value={preferredPronouns ?? ""}
        disabled={isLoading}
        onChange={(evt) => void setPreferredPronouns(evt.target.value)}
      />

      {/* EMAIL */}
      <Input
        id="Email"
        error={inputError === "Email"}
        label="Email"
        type="email"
        value={email}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Email") setInputError("");
          setEmail(evt.target.value);
        }}
      />

      {/* PHONE */}
      <Input
        id={"Number"}
        error={inputError === "Number"}
        label="Phone Number (no dashes)"
        value={phoneNumber}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Number") setInputError("");
          setPhoneNumber(evt.target.value);
        }}
      />
    </form>
  );
};

export default ContactForm;
