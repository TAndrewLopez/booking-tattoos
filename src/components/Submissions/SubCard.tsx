import { type AppointmentData } from "@/types";
import { useEffect, useState } from "react";
import Input from "../Form/Inputs/Input";
import SubCardHeader from "./SubCardHeader";

interface SubCardProps {
  data: AppointmentData;
}

const SubCard: React.FC<SubCardProps> = ({ data }) => {
  const [editEnabled, setEditEnabled] = useState(true);
  const [displaySection, setDisplaySection] = useState("Contact");

  // INPUT STATES
  const [name, setName] = useState("");
  const [preferredPronouns, setPreferredPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [placement, setPlacement] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    setName(data.name);
    setPreferredPronouns(data.preferredPronouns);
    setEmail(data.email);
    setNumber(data.phoneNumber);
    setDescription(data.description);
    setSize(data.size);
    setPlacement(data.placement);
    setColor(data.color);
  }, [
    data.name,
    data.preferredPronouns,
    data.email,
    data.phoneNumber,
    data.description,
    data.size,
    data.placement,
    data.color,
  ]);

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow">
      <SubCardHeader
        displaySection={displaySection}
        editEnabled={editEnabled}
        setDisplaySection={setDisplaySection}
        setEditEnabled={setEditEnabled}
      />

      {displaySection === "Contact" && (
        <div className="space-y-2 p-3">
          <Input
            id="Name"
            label="Name"
            value={name}
            disabled={editEnabled}
            onChange={(evt) => {
              setName(evt.target.value);
            }}
          />
          <Input
            id="Pronouns"
            label="Preferred Pronouns"
            value={preferredPronouns}
            disabled={editEnabled}
            onChange={(evt) => {
              setPreferredPronouns(evt.target.value);
            }}
          />
          <Input
            id="Email"
            label="Email"
            value={email}
            disabled={editEnabled}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
          <Input
            id="Number"
            label="Phone Number"
            value={number}
            disabled={editEnabled}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
        </div>
      )}

      {displaySection === "Tattoo" && (
        <div className="space-y-2 p-3">
          <Input
            id="Description"
            label="Description"
            value={description}
            disabled={editEnabled}
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
          />
          <Input
            id="Size"
            label="Size"
            value={size}
            disabled={editEnabled}
            onChange={(evt) => {
              setSize(evt.target.value);
            }}
          />
          <Input
            id="Placement"
            label="Placement"
            value={placement}
            disabled={editEnabled}
            onChange={(evt) => {
              setPlacement(evt.target.value);
            }}
          />
          <Input
            id="Color"
            label="Color"
            value={color}
            disabled={editEnabled}
            onChange={(evt) => {
              setColor(evt.target.value);
            }}
          />
        </div>
      )}

      {displaySection === "Response" && (
        <div>
          <p>Number of Appointments</p>
          <p>Requires Consultation?</p>
          <p>Notes Field</p>
          <p>Accept/Reject</p>
        </div>
      )}
    </div>
  );
};

export default SubCard;
