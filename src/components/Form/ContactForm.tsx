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
    <form className="flex h-full flex-col justify-between gap-4">
      {/* NAME */}
      <div>
        <p className="mb-3">Enter your first and last name:</p>
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
      </div>

      {/* PREFERRED PRONOUNS */}
      <div>
        <p className="mb-3">Select your preferred pronouns:</p>
        <Select
          label="Select Pronouns"
          options={["he/him", "she/her", "they/them"]}
          value={preferredPronouns ?? ""}
          disabled={isLoading}
          onChange={(evt) => void setPreferredPronouns(evt.target.value)}
        />
      </div>

      {/* EMAIL */}
      <div>
        <p className="mb-3">Enter the best email address for correspondence:</p>
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
      </div>

      {/* PHONE */}
      <div>
        <p className="mb-3">
          Enter the best phone number for correspondence:{" "}
          <span className="text-sm text-neutral-600">(no dashes)</span>
        </p>
        <Input
          id={"Number"}
          error={inputError === "Number"}
          label="Phone Number"
          value={phoneNumber}
          disabled={isLoading}
          onChange={(evt) => {
            if (inputError === "Number") setInputError("");
            setPhoneNumber(evt.target.value);
          }}
        />
      </div>
    </form>
  );
};

export default ContactForm;
