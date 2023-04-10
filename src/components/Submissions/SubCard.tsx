import { type AppointmentData } from "@/types";
import { type SyntheticEvent, useCallback, useEffect, useState } from "react";
import Input from "../Form/Inputs/Input";
import SubCardHeader from "./SubCardHeader";
import TextArea from "../Form/Inputs/TextArea";
import Button from "@/components/Form/Inputs/Button";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import moment from "moment";

interface SubCardProps {
  data: AppointmentData;
}

// TODO: CONSULTATION DATE NEEDS TO BE ADDED TO DATABASE
// TODO: NUMBER OF APPOINTMENT AND DATES PROVIDE ONCE DATABASE IS ADDED TO APPOINTMENT

const SubCard: React.FC<SubCardProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editEnabled, setEditEnabled] = useState(true);
  const [displaySection, setDisplaySection] = useState("Contact");

  const updateApt = api.appointment.update.useMutation();

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
  const [accepted, setAccepted] = useState<boolean | null>(true);
  const [consultationDate, setConsultationDate] = useState("");

  const submitUpdate = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);
        updateApt.mutate({
          id: data.id,
          name,
          preferredPronouns,
          email,
          phoneNumber: number,
          description,
          placement,
          size,
          color,
          requiresConsultation: consultation,
          notes,
          consultationDate: new Date(
            new Date(`${consultationDate} 12:30:00`).toISOString()
          ),
        });
        setEditEnabled(true);
        toast.success("Update successful.");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [
      data.id,
      name,
      preferredPronouns,
      email,
      number,
      description,
      placement,
      size,
      color,
      notes,
      updateApt,
      consultation,
      consultationDate,
    ]
  );

  useEffect(() => {
    setName(data.name);
    setPreferredPronouns(data.preferredPronouns);
    setEmail(data.email);
    setNumber(data.phoneNumber);
    setDescription(data.description);
    setSize(data.size);
    setPlacement(data.placement);
    setColor(data.color);

    // RESPONSE STATES
    setConsultation(data.requiresConsultation ?? false);
    setNotes(data.notes ?? "");
    setAccepted(data.accepted);
    setConsultationDate(
      moment(data.consultationDate?.toISOString()).format("yyyy-MM-DD")
    );
  }, [
    data.name,
    data.preferredPronouns,
    data.email,
    data.phoneNumber,
    data.description,
    data.size,
    data.placement,
    data.color,
    data.notes,
    data.requiresConsultation,
    data.consultationDate,
    data.accepted,
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
                  Consultation Date:
                </label>
                <input
                  id="consultation-date"
                  className="px-2 outline-dashed outline-1"
                  type="date"
                  value={consultationDate}
                  onChange={(evt) => {
                    console.log(evt.target.valueAsNumber);
                    setConsultationDate(evt.target.value);
                  }}
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
          {/* <p>Number of Appointments</p> */}

          <div className="flex justify-between gap-4 md:justify-end">
            <button
              onClick={() =>
                setAccepted(() => {
                  if (accepted === false) {
                    return null;
                  } else {
                    return false;
                  }
                })
              }
              className={`
              rounded-md px-3 py-2
              hover:text-white 
              disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50
              ${
                accepted === false
                  ? "bg-red-900 text-white"
                  : "bg-red-200 text-red-900 hover:bg-red-900"
              }
              `}
              disabled={editEnabled}
            >
              Rejected
            </button>
            <button
              onClick={() =>
                setAccepted(() => {
                  if (accepted) {
                    return null;
                  } else {
                    return true;
                  }
                })
              }
              className={`
              rounded-md px-3 py-2
              hover:text-white 
              disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50
              ${
                accepted
                  ? "bg-emerald-900 text-white"
                  : "bg-emerald-200 text-emerald-900 hover:bg-emerald-900"
              }
              `}
              disabled={editEnabled}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {!editEnabled && (
        <div className="flex items-center justify-center px-3 pb-3">
          <Button
            label={isLoading ? <ClipLoader color="red" /> : "Save"}
            type="submit"
            disabled={editEnabled}
            onClick={submitUpdate}
            fullSize
          />
        </div>
      )}
    </div>
  );
};

export default SubCard;
