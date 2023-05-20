import Input from "@/components/Inputs/Input";
import type { Dispatch, SetStateAction } from "react";
import SubSection from "./SubSection";

interface TattooSectionProps {
  editEnabled: boolean;
  tattooState: {
    description: string;
    size: string;
    placement: string;
    color: string;
  };
  setTattooState: Dispatch<
    SetStateAction<{
      description: string;
      size: string;
      placement: string;
      color: string;
    }>
  >;
}

const TattooSection: React.FC<TattooSectionProps> = ({
  editEnabled,
  tattooState: { description, size, placement, color },
  setTattooState,
}) => {
  return (
    <SubSection>
      <Input
        id="Description"
        label="Description"
        disabled={!editEnabled}
        value={description}
        onChange={({ target }) => {
          setTattooState((prev) => ({
            ...prev,
            description: target.value,
          }));
        }}
      />
      <Input
        id="Size"
        label="Size"
        disabled={!editEnabled}
        value={size}
        onChange={({ target }) => {
          setTattooState((prev) => ({ ...prev, size: target.value }));
        }}
      />
      <Input
        id="Placement"
        label="Placement"
        disabled={!editEnabled}
        value={placement}
        onChange={({ target }) =>
          setTattooState((prev) => ({ ...prev, placement: target.value }))
        }
      />
      <Input
        id="Color"
        label="Color"
        disabled={!editEnabled}
        value={color}
        onChange={({ target }) =>
          setTattooState((prev) => ({ ...prev, color: target.value }))
        }
      />
    </SubSection>
  );
};

export default TattooSection;
