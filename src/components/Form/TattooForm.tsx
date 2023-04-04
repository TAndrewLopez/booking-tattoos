import useAppointmentStore from "@/state/appointmentStore";
import Input from "./Inputs/Input";
import Select from "./Inputs/Select";

interface TattooFormProps {
  inputError?: string;
  setInputError: (val: string) => void;
  isLoading: boolean;
}

const TattooForm: React.FC<TattooFormProps> = ({
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
  } = useAppointmentStore();
  return (
    <form className="flex flex-col gap-4">
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
        label="Size of Tattoo (inches)"
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
    </form>
  );
};

export default TattooForm;
