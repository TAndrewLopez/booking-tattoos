import Button from "@/components/Form/Inputs/Button";
import { storage } from "@/lib/firebase";
import type { Appointment, AppointmentStateInterface } from "@/types";
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

  // CONTACT STATES
  const [contactState, setContactState] = useState({
    name: "",
    preferredPronouns: "",
    email: "",
    number: "",
  });

  // TATTOO STATES
  const [tattooState, setTattooState] = useState({
    description: "",
    size: "",
    placement: "",
    color: "",
  });

  // APPOINTMENT STATES
  const [appointmentState, setAppointmentState] =
    useState<AppointmentStateInterface>({
      accepted: null,
      consultation: false,
      sessions: "0",
      sessionDates: [],
      consultationDate: "",
      deposit: false,
      reason: "",
      referral: "",
    });

  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editEnabled, setEditEnabled] = useState(false);
  const [displaySection, setDisplaySection] = useState("Contact");
  const [image, setImage] = useState<File | null>(null);

  const handleUpdateAppointment = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      const { name, preferredPronouns, email, number } = contactState;
      const { description, placement, size, color } = tattooState;
      const {
        accepted,
        consultation,
        sessions,
        sessionDates,
        consultationDate,
        deposit,
        reason,
        referral,
      } = appointmentState;

      try {
        setIsLoading(true);
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
            sessionDates,
            depositPaid: deposit,
          });
          setAppointmentState((prev) => ({
            ...prev,
            reason: "",
            referral: "",
          }));
        }
        if (accepted === false) {
          updateRejectedApt.mutate({
            id: data.id,
            accepted,
            rejectionReason: reason,
            tattooReferral: referral,
          });
          setAppointmentState((prev) => ({
            ...prev,
            consultation: false,
            sessions: "0",
          }));
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
      contactState,
      tattooState,
      appointmentState,
      createNote,
      updateAcceptedApt,
      updateFormInformation,
      updateRejectedApt,
      notes,
      userId,
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
      const firebaseRef = `referenceImages/${image?.name + uuid.v4()}`;
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
  }, [data.id, image, addReferenceImage]);

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

  const setDefaultStates = useCallback(() => {
    // FORM STATES
    setContactState({
      name: data.name,
      preferredPronouns: data.preferredPronouns,
      email: data.email,
      number: data.phoneNumber,
    });

    setTattooState({
      description: data.description,
      size: data.size,
      placement: data.placement,
      color: data.color,
    });

    setAppointmentState({
      accepted: data.accepted,
      consultation: data.requiresConsultation || false,
      sessions: data.sessionsAmount || "0",
      sessionDates: data.sessionDates,
      consultationDate: "",
      deposit: data.depositPaid || false,
      reason: data.rejectionReason || "",
      referral: data.tattooReferral || "",
    });

    if (data.consultationDate)
      setAppointmentState((prev) => ({
        ...prev,
        consultationDate: moment(
          data.consultationDate?.toISOString() ?? ""
        ).format("yyyy-MM-DD"),
      }));
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
    data.sessionDates,
    data.consultationDate,
    data.depositPaid,
    data.rejectionReason,
    data.tattooReferral,
  ]);

  useEffect(() => {
    setDefaultStates();
  }, [setDefaultStates]);

  return (
    <div className="h-fit w-full max-w-3xl rounded-lg border border-gray-200 bg-white shadow-sm shadow-blue-200">
      <SubCardHeader
        setDefaultStates={setDefaultStates}
        displaySection={displaySection}
        editEnabled={editEnabled}
        setDisplaySection={setDisplaySection}
        setEditEnabled={setEditEnabled}
      />

      {displaySection === "Contact" && (
        <ContactSection
          editEnabled={editEnabled}
          contactState={contactState}
          setContactState={setContactState}
        />
      )}

      {displaySection === "Tattoo" && (
        <TattooSection
          editEnabled={editEnabled}
          tattooState={tattooState}
          setTattooState={setTattooState}
        />
      )}

      {displaySection === "Appointment" && (
        <AppointmentSection
          editEnabled={editEnabled}
          appointmentState={appointmentState}
          setAppointmentState={setAppointmentState}
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
