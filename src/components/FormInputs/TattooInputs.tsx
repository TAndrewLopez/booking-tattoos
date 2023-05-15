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
  const { setValue, description, size, placement, color } = useFormStore();

  return (
    <>
      {/* DESCRIPTION */}
      <Input
        id="Description"
        error={inputError === "Description"}
        label="Description"
        value={description}
        disabled={isLoading}
        onChange={({ target }) => {
          if (inputError === "Description") setInputError("");
          setValue("description", target.value);
        }}
      />
      {/* SIZE */}
      <Input
        id="Size"
        error={inputError === "Size"}
        label="Size of Tattoo"
        value={size}
        disabled={isLoading}
        onChange={({ target }) => {
          if (inputError === "Size") setInputError("");
          setValue("size", target.value);
        }}
      />
      {/* PLACEMENT */}
      <Input
        id="Placement"
        error={inputError === "Placement"}
        label="Tattoo Placement"
        value={placement}
        disabled={isLoading}
        onChange={({ target }) => {
          if (inputError === "Placement") setInputError("");
          setValue("placement", target.value);
        }}
      />
      {/* COLOR */}
      <Select
        label="Select Colors"
        options={["Black & Grey", "Colored"]}
        value={color}
        disabled={isLoading}
        onChange={({ target }) => {
          if (inputError === "Color") setInputError("");
          setValue("color", target.value);
        }}
      />
    </>
  );
};

export default TattooInputs;
