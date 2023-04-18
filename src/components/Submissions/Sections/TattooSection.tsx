import Input from "@/components/Form/Inputs/Input";
import { type Appointment, type TattooInputs } from "@/types";
import { useEffect } from "react";

interface TattooSectionProps {
  data: Appointment;
  editEnabled: boolean;
  inputs: TattooInputs;
}

const TattooSection: React.FC<TattooSectionProps> = ({
  data,
  editEnabled,
  inputs: { description, size, placement, color },
}) => {
  // INITIAL VALUES
  useEffect(() => {
    description.set(data.description);
    size.set(data.size);
    placement.set(data.placement);
    color.set(data.color);
  }, [
    data.description,
    data.size,
    data.placement,
    data.color,
    description,
    size,
    placement,
    color,
  ]);
  return (
    <section className="space-y-2 p-3">
      <Input
        id="Description"
        label="Description"
        disabled={!editEnabled}
        value={description.value}
        onChange={(evt) => {
          description.set(evt.target.value);
        }}
      />
      <Input
        id="Size"
        label="Size"
        disabled={!editEnabled}
        value={size.value}
        onChange={(evt) => {
          size.set(evt.target.value);
        }}
      />
      <Input
        id="Placement"
        label="Placement"
        disabled={!editEnabled}
        value={placement.value}
        onChange={(evt) => {
          placement.set(evt.target.value);
        }}
      />
      <Input
        id="Color"
        label="Color"
        disabled={!editEnabled}
        value={color.value}
        onChange={(evt) => {
          color.set(evt.target.value);
        }}
      />
    </section>
  );
};

export default TattooSection;
