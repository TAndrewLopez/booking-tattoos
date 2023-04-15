import { type Appointment } from "@/types";
import { type SyntheticEvent, useCallback, useEffect, useState } from "react";
import Input from "../Form/Inputs/Input";
import SubCardHeader from "./SubCardHeader";
import TextArea from "../Form/Inputs/TextArea";
import Button from "@/components/Form/Inputs/Button";
import { api } from "@/utils/api";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import moment from "moment";
import { FiTrash } from "react-icons/fi";

interface SubCardProps {
  userId: string;
  data: Appointment;
}

// TODO: STORE CONSULTATION AND TATTOO APPOINTMENT DATES IN DATABASE
// TODO: REPLACE USE EFFECT WITH CONDITIONAL LOGIC FOR INITIAL VALUES ON STATE

const SubCard: React.FC<SubCardProps> = ({ userId, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editEnabled, setEditEnabled] = useState(true);
  const [displaySection, setDisplaySection] = useState("Contact");

  const { refetch: refetchNotes } = api.appointment.getAll.useQuery();
  
  const createNote = api.appointmentNotes.create.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const deleteNote = api.appointmentNotes.delete.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const updateApt = api.appointment.update.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  // INPUT STATES
  const [name, setName] = useState("");
  const [preferredPronouns, setPreferredPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [placement, setPlacement] = useState("");
  const [color, setColor] = useState("");

  // APPOINTMENT STATES
  const [consultation, setConsultation] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [consultationDate, setConsultationDate] = useState("");
  const [deposit, setDeposit] = useState(false);
  const [references, setReferences] = useState(false);

  // NOTES STATES
  const [notes, setNotes] = useState("");

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
          accepted: accepted ?? undefined,
          consultationDate: consultationDate
            ? new Date(new Date(`${consultationDate} 11:30:00`).toISOString())
            : undefined,
        });
        createNote.mutate({
          userId,
          appointmentId: data.id,
          text: notes,
        });
        setNotes("");
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
      createNote,
      consultation,
      consultationDate,
      accepted,
      userId,
    ]
  );

  const handleDelete = useCallback(
    (noteId: string) => {
      try {
        setIsLoading(true);
        deleteNote.mutate({ id: noteId });
        setEditEnabled(true);
        toast.success("Note deleted successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [deleteNote]
  );

  useEffect(() => {
    // INPUT STATES
    setName(data.name);
    setPreferredPronouns(data.preferredPronouns);
    setEmail(data.email);
    setNumber(data.phoneNumber);
    setDescription(data.description);
    setSize(data.size);
    setPlacement(data.placement);
    setColor(data.color);

    // RESPONSE STATES
    if (data.accepted === true || data.accepted === false)
      setAccepted(data.accepted);
    if (data.requiresConsultation) setConsultation(data.requiresConsultation);
    if (data.consultationDate)
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
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm shadow-blue-200">
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
            disabled={editEnabled}
            value={name}
            onChange={(evt) => {
              setName(evt.target.value);
            }}
          />
          <Input
            id="Pronouns"
            label="Preferred Pronouns"
            disabled={editEnabled}
            value={preferredPronouns}
            onChange={(evt) => {
              setPreferredPronouns(evt.target.value);
            }}
          />
          <Input
            id="Email"
            label="Email"
            disabled={editEnabled}
            value={email}
            onChange={(evt) => {
              setEmail(evt.target.value);
            }}
          />
          <Input
            id="Number"
            label="Phone Number"
            disabled={editEnabled}
            value={number}
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
            disabled={editEnabled}
            value={description}
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
          />
          <Input
            id="Size"
            label="Size"
            disabled={editEnabled}
            value={size}
            onChange={(evt) => {
              setSize(evt.target.value);
            }}
          />
          <Input
            id="Placement"
            label="Placement"
            disabled={editEnabled}
            value={placement}
            onChange={(evt) => {
              setPlacement(evt.target.value);
            }}
          />
          <Input
            id="Color"
            label="Color"
            disabled={editEnabled}
            value={color}
            onChange={(evt) => {
              setColor(evt.target.value);
            }}
          />
        </div>
      )}

      {displaySection === "Appointment" && (
        <div className="space-y-2 p-3">
          <div className="flex flex-col gap-5 md:flex-row md:justify-between">
            {/* REQUIRES CONSULTATION */}
            <div className="flex flex-col justify-between gap-5 md:flex-row">
              <div className="flex items-center">
                <label className="mr-2" htmlFor="consultation">
                  Requires Consultation
                </label>
                <input
                  className="h-4 w-4"
                  id="consultation"
                  type="checkbox"
                  disabled={editEnabled}
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
                    disabled={editEnabled}
                    value={consultationDate}
                    onChange={(evt) => {
                      setConsultationDate(evt.target.value);
                    }}
                  />
                </div>
              )}
            </div>
            {/* REQUIRES REFERENCES */}
            <div className="flex flex-col gap-5 md:flex-row md:justify-between">
              <div className="flex items-center">
                <label className="mr-2" htmlFor="references">
                  References Received
                </label>
                <input
                  className="h-4 w-4"
                  id="references"
                  type="checkbox"
                  disabled={editEnabled}
                  checked={references}
                  onChange={() => setReferences(!references)}
                />
              </div>
              {/* REQUIRES DEPOSIT */}
              <div className="flex items-center">
                <label className="mr-2" htmlFor="deposit">
                  Deposit Paid
                </label>
                <input
                  className="h-4 w-4"
                  id="deposit"
                  type="checkbox"
                  disabled={editEnabled}
                  checked={deposit}
                  onChange={() => setDeposit(!deposit)}
                />
              </div>
            </div>
          </div>

          {/* ACCEPTED/REJECTED BUTTONS */}
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

      {displaySection === "Notes" && (
        <div className="space-y-2 p-3">
          {data.notes.map((note) => (
            <div
              className={`flex w-full rounded-md px-6 py-3
              ${editEnabled ? "bg-neutral-700 text-white" : "bg-neutral-200"}
              `}
              key={note.id}
            >
              <div className="flex grow items-center">
                <p>{note.text}</p>
              </div>
              <div className="grid grid-cols-2 text-xs">
                <div className="col-span-1">
                  <p className="hidden font-semibold md:block">Created At:</p>
                  <p className="hidden font-semibold md:block">Created By:</p>
                </div>
                <div className="col-span-1">
                  <p className="hidden truncate md:block">
                    {moment(note.createdAt).format("MMMM DD hh:ss A")}
                  </p>
                  <p className="hidden truncate md:block">{note.user?.name}</p>
                </div>
              </div>
              {userId === note.userId && !editEnabled && (
                <button
                  onClick={() => handleDelete(note.id)}
                  disabled={editEnabled}
                  className="ml-4"
                >
                  <FiTrash
                    className={
                      editEnabled ? "text-neutral-400" : "text-neutral-700"
                    }
                    size={18}
                  />
                </button>
              )}
            </div>
          ))}
          <TextArea
            id="Notes"
            label="Notes"
            value={notes}
            onChange={(evt) => setNotes(evt.target.value)}
            disabled={editEnabled}
          />
        </div>
      )}

      {!editEnabled && (
        <div className="flex items-center justify-center px-3 pb-3">
          <Button
            label={isLoading ? <ClipLoader color="blue" /> : "Save"}
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
