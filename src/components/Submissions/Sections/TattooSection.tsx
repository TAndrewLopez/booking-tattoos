import Input from "@/components/Form/Inputs/Input";
import type { Appointment } from "@/types";
import type { Dispatch, SetStateAction } from "react";

interface TattooSectionProps {
  data: Appointment;
  editEnabled: boolean;
  description: string;
  size: string;
  placement: string;
  color: string;
  setDescription: Dispatch<SetStateAction<string>>;
  setSize: Dispatch<SetStateAction<string>>;
  setPlacement: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<string>>;
}

const TattooSection: React.FC<TattooSectionProps> = ({
  editEnabled,
  description,
  size,
  placement,
  color,
  setDescription,
  setSize,
  setPlacement,
  setColor,
}) => {
  return (
    <section className="space-y-2 p-3">
      <Input
        id="Description"
        label="Description"
        disabled={!editEnabled}
        value={description}
        onChange={(evt) => {
          setDescription(evt.target.value);
        }}
      />
      <Input
        id="Size"
        label="Size"
        disabled={!editEnabled}
        value={size}
        onChange={(evt) => {
          setSize(evt.target.value);
        }}
      />
      <Input
        id="Placement"
        label="Placement"
        disabled={!editEnabled}
        value={placement}
        onChange={(evt) => {
          setPlacement(evt.target.value);
        }}
      />
      <Input
        id="Color"
        label="Color"
        disabled={!editEnabled}
        value={color}
        onChange={(evt) => {
          setColor(evt.target.value);
        }}
      />
    </section>
  );
};

export default TattooSection;
