import Button from "@/components/Form/Inputs/Button";
import { storage } from "@/lib/firebase";
import { type Appointment } from "@/types";
import { api } from "@/utils/api";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import * as uuid from "uuid";
import AppointmentSection from "./Sections/AppointmentSection";
import ContactSection from "./Sections/ContactSection";
import NoteSection from "./Sections/NoteSection";
import TattooSection from "./Sections/TattooSection";
import SubCardHeader from "./SubCardHeader";
import { useSession } from "next-auth/react";

interface SubCardProps {
  userId: string;
  data: Appointment;
}

// TODO: STORE CONSULTATION AND TATTOO APPOINTMENT DATES IN DATABASE

const SubCard: React.FC<SubCardProps> = ({ userId, data }) => {
  const { data: sessionData } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [displaySection, setDisplaySection] = useState("Contact");

  const { refetch: refetchAppointments } = api.appointment.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );

  const updateApt = api.appointment.updateAppointment.useMutation({
    onSuccess: () => void refetchAppointments(),
  });
  const createNote = api.appointmentNotes.create.useMutation({
    onSuccess: () => void refetchAppointments(),
  });
  const deleteNote = api.appointmentNotes.delete.useMutation({
    onSuccess: () => void refetchAppointments(),
  });
  const addReferenceImage = api.appointment.addReferenceImage.useMutation({
    onSuccess: () => void refetchAppointments(),
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
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [consultation, setConsultation] = useState(false);
  const [sessions, setSessions] = useState("0");

  const [consultationDate, setConsultationDate] = useState("");
  const [deposit, setDeposit] = useState(false);
  const [image, setImage] = useState<File | null>(null);
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
    sessions: {
      value: sessions,
      set: setSessions,
    },
    deposit: {
      value: deposit,
      set: setDeposit,
    },
    image: {
      value: image,
      set: setImage,
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
          accepted: accepted ?? undefined,
          requiresConsultation: consultation,
          consultationDate: consultationDate
            ? new Date(new Date(`${consultationDate} 11:30:00`).toISOString())
            : undefined,
          sessionsAmount: sessions,
          depositPaid: deposit,
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
      sessions,
      deposit,
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

  const uploadImage = useCallback(async () => {
    try {
      if (image === null) return;
      const imageRef = ref(
        storage,
        `referenceImages/${image?.name + uuid.v4()}`
      );
      const result = await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(result.ref);
      addReferenceImage.mutate({ appointmentId: data.id, imageURL });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  }, [image, addReferenceImage, data.id]);

  // LOAD INITIAL VALUES FROM DB
  // useEffect(() => {
  //   // CONTACT STATES
  //   setName(data.name);
  //   setPreferredPronouns(data.preferredPronouns);
  //   setEmail(data.email);
  //   setNumber(data.phoneNumber);

  //   // TATTOO STATES
  //   setDescription(data.description);
  //   setSize(data.size);
  //   setPlacement(data.placement);
  //   setColor(data.color);

  //   // APPOINTMENT STATES
  //   if (data.accepted || data.accepted === false) setAccepted(data.accepted);
  //   if (data.requiresConsultation) setConsultation(data.requiresConsultation);

  //   if (data.consultationDate)
  //     setConsultationDate(
  //       moment(data.consultationDate?.toISOString()).format("yyyy-MM-DD")
  //     );
  // }, [
  //   data.name,
  //   data.preferredPronouns,
  //   data.email,
  //   data.phoneNumber,
  //   data.description,
  //   data.size,
  //   data.placement,
  //   data.color,
  //   data.notes,
  //   data.requiresConsultation,
  //   data.consultationDate,
  //   data.accepted,
  // ]);

  return (
    <div className="w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-sm shadow-blue-200">
      <SubCardHeader
        displaySection={displaySection}
        editEnabled={editEnabled}
        setDisplaySection={setDisplaySection}
        setEditEnabled={setEditEnabled}
      />

      {displaySection === "Contact" && (
        <ContactSection
          data={data}
          editEnabled={editEnabled}
          inputs={contactInputs}
        />
      )}

      {displaySection === "Tattoo" && (
        <TattooSection
          data={data}
          editEnabled={editEnabled}
          inputs={tattooInputs}
        />
      )}

      {displaySection === "Appointment" && (
        <AppointmentSection
          data={data}
          editEnabled={editEnabled}
          inputs={appointmentInputs}
          uploadImage={uploadImage}
          imageURL={data.referenceImageURL}
        />
      )}

      {displaySection === "Notes" && (
        <NoteSection
          data={data}
          editEnabled={editEnabled}
          inputs={noteInputs}
          handleDelete={handleDelete}
          userId={userId}
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
