import useAppointmentStore from "@/hooks/useAppointmentStore";
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
    <form className="mt-4 flex h-full flex-col gap-4">
      {/* DESCRIPTION */}
      <div>
        {/* <p className="mb-3">Provide a description of your desired tattoo</p> */}
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
      </div>

      {/* SIZE */}
      <div>
        {/* <p className="mb-3">Enter the size of your tattoo in inches</p> */}
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
      </div>

      {/* PLACEMENT */}
      <div>
        {/* <p className="mb-3">Enter where you want your tattoo</p> */}
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
      </div>

      {/* COLOR */}
      <div>
        {/* <p className="mb-3">Select your color palette</p> */}
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
      </div>
    </form>
  );
};

export default TattooForm;
