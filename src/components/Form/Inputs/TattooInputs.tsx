import useFormStore from "@/hooks/useFormStore";
import Input from "./Input";
import Select from "./Select";

interface TattooInputsProps {
  inputError?: string;
  setInputError: (val: string) => void;
  isLoading: boolean;
}

const TattooInputs: React.FC<TattooInputsProps> = ({
  inputError,
  setInputError,
  isLoading,
}) => {
  const {
    description,
    setDescription,
    size,
    setSize,
    placement,
    setPlacement,
    color,
    setColor,
  } = useFormStore();

  return (
    <>
      {/* DESCRIPTION */}
      <Input
        id="Description"
        error={inputError === "Description"}
        label="Description"
        value={description}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Description") setInputError("");
          setDescription(evt.target.value);
        }}
      />
      {/* SIZE */}
      <Input
        id="Size"
        error={inputError === "Size"}
        label="Size of Tattoo"
        value={size}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Size") setInputError("");
          setSize(evt.target.value);
        }}
      />
      {/* PLACEMENT */}
      <Input
        id="Placement"
        error={inputError === "Placement"}
        label="Tattoo Placement"
        value={placement}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Placement") setInputError("");
          setPlacement(evt.target.value);
        }}
      />
      {/* COLOR */}
      <Select
        label="Select Colors"
        options={["Black & Grey", "Colored"]}
        value={color}
        disabled={isLoading}
        onChange={(evt) => {
          if (inputError === "Color") setInputError("");
          setColor(evt.target.value);
        }}
      />
    </>
  );
};

export default TattooInputs;
