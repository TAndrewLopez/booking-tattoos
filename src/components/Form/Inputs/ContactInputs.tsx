import useFormStore from "@/hooks/useFormStore";
import Input from "./Input";

interface ContactInputsProps {
  inputError?: string;
  setInputError: (val: string) => void;
  isLoading: boolean;
}

const ContactInputs: React.FC<ContactInputsProps> = ({
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
  } = useFormStore();

  return (
    <>
      {/* NAME */}
      <Input
        id="Name"
        error={inputError === "Name"}
        label="Name"
        disabled={isLoading}
        value={name}
        onChange={(evt) => {
          if (inputError === "Name") setInputError("");
          setName(evt.target.value);
        }}
      />

      {/* PREFERRED PRONOUNS */}
      <Input
        id="Pronouns"
        error={inputError === "Pronouns"}
        label="Preferred Pronouns (optional)"
        disabled={isLoading}
        value={preferredPronouns}
        onChange={(evt) => {
          if (inputError === "Pronouns") setInputError("");
          setPreferredPronouns(evt.target.value);
        }}
      />

      {/* EMAIL */}
      <Input
        id="Email"
        error={inputError === "Email"}
        label="Email"
        type="email"
        disabled={isLoading}
        value={email}
        onChange={(evt) => {
          if (inputError === "Email") setInputError("");
          setEmail(evt.target.value);
        }}
      />

      {/* PHONE */}
      <Input
        id={"Number"}
        error={inputError === "Number"}
        label="Phone Number"
        disabled={isLoading}
        value={phoneNumber}
        onChange={(evt) => {
          if (inputError === "Number") setInputError("");
          setPhoneNumber(evt.target.value);
        }}
      />
    </>
  );
};

export default ContactInputs;
