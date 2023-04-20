import Button from "@/components/Form/Inputs/Button";
import { storage } from "@/lib/firebase";
import type { Appointment } from "@/types";
import { api } from "@/utils/api";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import * as uuid from "uuid";
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

const SubCard: React.FC<SubCardProps> = ({ userId, data }) => {
  const { data: sessionData } = useSession();

  const { refetch: refetchAppointments } = api.appointment.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const updateFormInformation =
    api.appointment.updateContactAndTattooInformation.useMutation({
      onSuccess: () => void refetchAppointments(),
    });
  const updateAcceptedApt =
    api.appointment.updateAcceptedAppointment.useMutation({
      onSuccess: () => void refetchAppointments(),
    });
  const updateRejectedApt =
    api.appointment.updateRejectedAppointment.useMutation({
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
  const removeReferenceImage = api.appointment.removeReferenceImage.useMutation(
    {
      onSuccess: () => void refetchAppointments(),
    }
  );

  const [isLoading, setIsLoading] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [displaySection, setDisplaySection] = useState("Contact");

  // CONTACT STATES
  const [name, setName] = useState("");
  const [preferredPronouns, setPreferredPronouns] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");

  // TATTOO STATES
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [placement, setPlacement] = useState("");
  const [color, setColor] = useState("");

  // APPOINTMENT STATES
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [consultation, setConsultation] = useState(false);
  const [sessions, setSessions] = useState("0");
  const [consultationDate, setConsultationDate] = useState("");
  const [deposit, setDeposit] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [reason, setReason] = useState("");
  const [referral, setReferral] = useState("");

  // NOTES STATES
  const [notes, setNotes] = useState("");

  const handleUpdateAppointment = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);
        console.log("Updating Form Information");
        updateFormInformation.mutate({
          id: data.id,
          name,
          preferredPronouns,
          email,
          phoneNumber: number,
          description,
          placement,
          size,
          color,
        });
        if (accepted) {
          updateAcceptedApt.mutate({
            id: data.id,
            accepted,
            requiresConsultation: consultation,
            consultationDate: consultationDate
              ? new Date(new Date(`${consultationDate} 11:30:00`).toISOString())
              : undefined,
            sessionsAmount: sessions,
            depositPaid: deposit,
            sessionDates: [""],
          });
          setReason("");
          setReferral("");
        }
        if (accepted === false) {
          updateRejectedApt.mutate({
            id: data.id,
            accepted,
            rejectionReason: reason,
            tattooReferral: referral,
          });
          setConsultation(false);
          setSessions("0");
        }
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
      updateFormInformation,
      updateAcceptedApt,
      updateRejectedApt,
      createNote,
      consultation,
      consultationDate,
      accepted,
      userId,
      sessions,
      reason,
      referral,
      deposit,
    ]
  );

  const handleDeleteNote = useCallback(
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
    if (!image) return;
    try {
      setIsLoading(true);
      const firebaseRef = `referenceImages/${image.name + uuid.v4()}`;
      const imageRef = ref(storage, firebaseRef);
      const result = await uploadBytes(imageRef, image);
      const referenceImageURL = await getDownloadURL(result.ref);
      addReferenceImage.mutate({
        appointmentId: data.id,
        firebaseRef,
        referenceImageURL,
      });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [image, addReferenceImage, data.id]);

  const handleDeleteImage = useCallback(async () => {
    if (!data.firebaseRef) return;
    try {
      setIsLoading(true);
      const imageRef = ref(storage, data.firebaseRef);
      await deleteObject(imageRef);
      removeReferenceImage.mutate({ appointmentId: data.id });
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [data?.firebaseRef, removeReferenceImage, data?.id]);

  // INITIAL VALUES
  useEffect(() => {
    setName(data.name);
    setPreferredPronouns(data.preferredPronouns);
    setEmail(data.email);
    setNumber(data.phoneNumber);
    setDescription(data.description);
    setSize(data.size);
    setPlacement(data.placement);
    setColor(data.color);

    setAccepted(data.accepted);
    if (data.requiresConsultation) setConsultation(data.requiresConsultation);
    if (data.consultationDate)
      setConsultationDate(
        moment(data.consultationDate.toISOString()).format("yyyy-MM-DD")
      );
    if (data.sessionsAmount) setSessions(data.sessionsAmount ?? "0");
    if (data.depositPaid) setDeposit(data.depositPaid);

    // REJECTION STATES
    if (data.rejectionReason) setReason(data.rejectionReason);
    if (data.tattooReferral) setReferral(data.tattooReferral);
  }, [
    data.name,
    data.preferredPronouns,
    data.email,
    data.phoneNumber,
    data.description,
    data.size,
    data.placement,
    data.color,
    data.accepted,
    data.requiresConsultation,
    data.sessionsAmount,
    data.consultationDate,
    data.depositPaid,
    data.rejectionReason,
    data.tattooReferral,
    setName,
    setPreferredPronouns,
    setEmail,
    setNumber,
    setDescription,
    setSize,
    setPlacement,
    setColor,
    setAccepted,
    setConsultation,
    setSessions,
    setConsultationDate,
    setDeposit,
    setReason,
    setReferral,
  ]);

  return (
    <div className="h-fit w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-sm shadow-blue-200">
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
          name={name}
          preferredPronouns={preferredPronouns}
          email={email}
          number={number}
          setName={setName}
          setPreferredPronouns={setPreferredPronouns}
          setEmail={setEmail}
          setNumber={setNumber}
        />
      )}

      {displaySection === "Tattoo" && (
        <TattooSection
          data={data}
          editEnabled={editEnabled}
          description={description}
          size={size}
          placement={placement}
          color={color}
          setDescription={setDescription}
          setSize={setSize}
          setPlacement={setPlacement}
          setColor={setColor}
        />
      )}

      {displaySection === "Appointment" && (
        <AppointmentSection
          data={data}
          editEnabled={editEnabled}
          accepted={accepted}
          consultation={consultation}
          sessions={sessions}
          consultationDate={consultationDate}
          deposit={deposit}
          reason={reason}
          referral={referral}
          setAccepted={setAccepted}
          setConsultation={setConsultation}
          setSessions={setSessions}
          setConsultationDate={setConsultationDate}
          setDeposit={setDeposit}
          setReason={setReason}
          setReferral={setReferral}
          setImage={setImage}
          uploadImage={uploadImage}
          deleteImage={handleDeleteImage}
          imageURL={data.referenceImageURL}
        />
      )}

      {displaySection === "Notes" && (
        <NoteSection
          data={data}
          editEnabled={editEnabled}
          notes={notes}
          setNotes={setNotes}
          handleDelete={handleDeleteNote}
          userId={userId}
        />
      )}

      {editEnabled && (
        <div className="flex items-center justify-center px-3 pb-3">
          <Button
            label={isLoading ? <ClipLoader color="blue" /> : "Save"}
            type="submit"
            disabled={!editEnabled}
            onClick={handleUpdateAppointment}
            fullSize
          />
        </div>
      )}
    </div>
  );
};

export default SubCard;
