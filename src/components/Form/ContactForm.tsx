import { useState } from "react";
import Input from "./Input";
import Select from "./Select";

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
  // FORM INPUTS
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  return (
    <form className="flex flex-col gap-4 p-5">
      {/* NAME */}
      <Input
        error={inputError === "Name"}
        placeholder="Name"
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
        value={pronouns}
        disabled={isLoading}
        onChange={(evt) => void setPronouns(evt.target.value)}
      />

      {/* EMAIL */}
      <Input
        error={inputError === "Email"}
        placeholder="Email"
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
        error={inputError === "Number"}
        placeholder="Phone Number"
        type="number"
        value={number}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Number") setInputError("");
          setNumber(evt.target.value);
        }}
      />
    </form>
  );
};

export default ContactForm;
