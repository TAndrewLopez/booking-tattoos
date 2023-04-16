import Button from "@/components/Form/Inputs/Button";
import { type Appointment } from "@/types";
import { api } from "@/utils/api";
import moment from "moment";
import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import AppointmentSection from "./Sections/AppointmentSection";
import ContactSection from "./Sections/ContactSection";
import NoteSection from "./Sections/NoteSection";
import TattooSection from "./Sections/TattooSection";
import SubCardHeader from "./SubCardHeader";

interface SubCardProps {
  userId: string;
  data: Appointment;
}

// TODO: STORE CONSULTATION AND TATTOO APPOINTMENT DATES IN DATABASE
// TODO: REPLACE USE EFFECT WITH CONDITIONAL LOGIC FOR INITIAL VALUES ON STATE

const SubCard: React.FC<SubCardProps> = ({ userId, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
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

  // CONTACT STATES
  const [name, setName] = useState("");
  const [preferredPronouns, setPreferredPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const contactInputs = {
    name: {
      value: name,
      set: setName,
    },
    preferredPronouns: {
      value: preferredPronouns,
      set: setPreferredPronouns,
    },
    email: {
      value: email,
      set: setEmail,
    },
    number: {
      value: number,
      set: setNumber,
    },
  };

  // TATTOO STATES
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [placement, setPlacement] = useState("");
  const [color, setColor] = useState("");
  const tattooInputs = {
    description: {
      value: description,
      set: setDescription,
    },
    size: {
      value: size,
      set: setSize,
    },
    placement: {
      value: placement,
      set: setPlacement,
    },
    color: {
      value: color,
      set: setColor,
    },
  };

  // APPOINTMENT STATES
  const [consultation, setConsultation] = useState(false);
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [consultationDate, setConsultationDate] = useState("");
  const [deposit, setDeposit] = useState(false);
  const [references, setReferences] = useState(false);
  const appointmentInputs = {
    consultation: {
      value: consultation,
      set: setConsultation,
    },
    accepted: {
      value: accepted,
      set: setAccepted,
    },
    consultationDate: {
      value: consultationDate,
      set: setConsultationDate,
    },
    deposit: {
      value: deposit,
      set: setDeposit,
    },
    references: {
      value: references,
      set: setReferences,
    },
  };

  // NOTES STATES
  const [notes, setNotes] = useState("");
  const noteInputs = {
    notes: {
      value: notes,
      set: setNotes,
    },
  };

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

        if (notes.length) {
          createNote.mutate({
            userId,
            appointmentId: data.id,
            text: notes,
          });
          setNotes("");
        }
        setEditEnabled(false);
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
        setEditEnabled(false);
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
    <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-sm shadow-blue-200">
      <SubCardHeader
        displaySection={displaySection}
        editEnabled={editEnabled}
        setDisplaySection={setDisplaySection}
        setEditEnabled={setEditEnabled}
      />

      {displaySection === "Contact" && (
        <ContactSection editEnabled={editEnabled} inputs={contactInputs} />
      )}

      {displaySection === "Tattoo" && (
        <TattooSection editEnabled={editEnabled} inputs={tattooInputs} />
      )}

      {displaySection === "Appointment" && (
        <AppointmentSection
          editEnabled={editEnabled}
          inputs={appointmentInputs}
        />
      )}

      {displaySection === "Notes" && (
        <NoteSection
          editEnabled={editEnabled}
          inputs={noteInputs}
          handleDelete={handleDelete}
          userId={userId}
          data={data}
        />
      )}

      {editEnabled && (
        <div className="flex items-center justify-center px-3 pb-3">
          <Button
            label={isLoading ? <ClipLoader color="blue" /> : "Save"}
            type="submit"
            disabled={!editEnabled}
            onClick={submitUpdate}
            fullSize
          />
        </div>
      )}
    </div>
  );
};

export default SubCard;
