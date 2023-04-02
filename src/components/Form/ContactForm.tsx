import { type SyntheticEvent, useCallback, useState } from "react";
import Input from "./Input";
import Select from "./Select";
import { ClipLoader } from "react-spinners";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // FORM INPUTS
  const [name, setName] = useState("");
  const [pronouns, setPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [placement, setPlacement] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);
        console.log("form submitted", {
          name,
          pronouns,
          email,
          number,
          size,
          placement,
          color,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      }
    },
    [name, pronouns, email, number, size, placement, color]
  );

  return (
    <form className="flex flex-col gap-4 p-5">
      {/* NAME */}
      <Input
        placeholder="Name"
        value={name}
        disabled={isLoading}
        onChange={(evt) => setName(evt.target.value)}
      />

      {/* PREFERRED PRONOUNS */}
      <Select
        label="Select Pronouns"
        options={["he/him", "she/her", "they/them"]}
        value={pronouns}
        disabled={isLoading}
        onChange={(evt) => void setPronouns(evt.target.value)}
      />

      {/* EMAIL */}
      <Input
        placeholder="Email"
        value={email}
        disabled={isLoading}
        onChange={(evt) => setEmail(evt.target.value)}
      />

      {/* PHONE */}
      <Input
        placeholder="Phone Number"
        type="number"
        value={number}
        disabled={isLoading}
        onChange={(evt) => setNumber(evt.target.value)}
      />

      {/* DESCRIPTION */}
      <Input
        placeholder="Description"
        value={description}
        disabled={isLoading}
        onChange={(evt) => setDescription(evt.target.value)}
      />

      {/* SIZE */}
      <Input
        placeholder="Size of Tattoo (inches)"
        type="number"
        value={size}
        disabled={isLoading}
        onChange={(evt) => setSize(evt.target.value)}
      />

      {/* PLACEMENT */}
      <Input
        placeholder="Tattoo Placement"
        value={placement}
        disabled={isLoading}
        onChange={(evt) => setPlacement(evt.target.value)}
      />

      {/* COLOR */}
      <Select
        label="Select Colors"
        options={["Black & Grey", "Colored"]}
        value={color}
        disabled={isLoading}
        onChange={(evt) => void setColor(evt.target.value)}
      />

      <button
        className="flex items-center justify-center rounded-md bg-emerald-100 py-3 text-emerald-800 transition hover:bg-emerald-600 hover:text-neutral-100"
        onClick={handleSubmit}
      >
        {isLoading ? <ClipLoader color="#059669" size={24} /> : "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
