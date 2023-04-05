import { type AppointmentData } from "@/types";
import { useEffect, useState } from "react";
import Input from "../Form/Inputs/Input";
import SubCardHeader from "./SubCardHeader";
import { formatPhoneNumber } from "../Form/helper/formatPhoneNumber";
import TextArea from "../Form/Inputs/TextArea";
import Button from "@/components/Form/Inputs/Button";

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

  // RESPONSE STATES
  const [consultation, setConsultation] = useState(false);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setName(data.name);
    setPreferredPronouns(data.preferredPronouns);
    setEmail(data.email);
    setNumber(formatPhoneNumber(data.phoneNumber));
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
              setNumber(evt.target.value);
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
        <div className="space-y-2 p-3">
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="flex items-center">
              <label className="mr-2" htmlFor="consultation">
                Requires Consultation
              </label>
              <input
                disabled={editEnabled}
                className="h-4 w-4"
                id="consultation"
                type="checkbox"
                checked={consultation}
                onChange={() => setConsultation(!consultation)}
              />
            </div>
            {consultation && (
              <div className="flex items-center">
                <label className="mr-2" htmlFor="consultation-date">
                  Suggested Consultation Date:
                </label>
                <input
                  id="consultation-date"
                  className="px-2 outline-dashed outline-1"
                  type="date"
                  disabled={editEnabled}
                />
              </div>
            )}
          </div>
          <TextArea
            id="Notes"
            label="Notes"
            value={notes}
            onChange={(evt) => setNotes(evt.target.value)}
            disabled={editEnabled}
          />
          <p>Number of Appointments</p>

          <div className="flex justify-end gap-4">
            <button disabled={editEnabled}>Reject</button>
            <button disabled={editEnabled}>Accept</button>
          </div>
        </div>
      )}
      {!editEnabled && (
        <div className="flex items-center justify-center px-3 pb-3">
          <Button
            label="Save"
            type="submit"
            disabled={editEnabled}
            onClick={() => {
              console.log("save update", {
                name,
                preferredPronouns,
                email,
                number,
                description,
                placement,
                size,
                color,
              });
            }}
            fullSize
          />
        </div>
      )}
    </div>
  );
};

export default SubCard;
