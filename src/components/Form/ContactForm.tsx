import useAppointmentStore from "@/hooks/appointmentStore";
import Input from "./Inputs/Input";
import Select from "./Inputs/Select";

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
    <form className="mt-4 flex h-full flex-col gap-4">
      {/* NAME */}
      <div>
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
