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
  const { name, setValue, preferredPronouns, email, phoneNumber } =
    useFormStore();

  return (
    <>
      {/* NAME */}
      <Input
        id="Name"
        error={inputError === "Name"}
        label="Name"
        disabled={isLoading}
        value={name}
        onChange={({ target }) => {
          if (inputError && inputError === "Name") setInputError("");
          setValue("name", target.value);
        }}
      />

      {/* PREFERRED PRONOUNS */}
      <Input
        id="Pronouns"
        error={inputError === "Pronouns"}
        label="Preferred Pronouns (optional)"
        disabled={isLoading}
        value={preferredPronouns}
        onChange={({ target }) => {
          if (inputError && inputError === "Pronouns") setInputError("");
          setValue("preferredPronouns", target.value);
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
        onChange={({ target }) => {
          if (inputError && inputError === "Email") setInputError("");
          setValue("email", target.value);
        }}
      />

      {/* PHONE */}
      <Input
        id={"Number"}
        error={inputError === "Number"}
        label="Phone Number"
        disabled={isLoading}
        value={phoneNumber}
        onChange={({ target }) => {
          if (inputError && inputError === "Number") setInputError("");
          setValue("phoneNumber", target.value);
        }}
      />
    </>
  );
};

export default ContactInputs;
