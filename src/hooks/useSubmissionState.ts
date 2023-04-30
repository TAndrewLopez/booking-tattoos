import { storage } from "@/lib/firebase";
import type { AppointmentStateInterface } from "@/types";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useCallback, useState, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import * as uuid from "uuid";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

interface useSubmissionProps {
  dataId: string;
  userId: string;
  firebaseRef: string | null;
}

const useSubmissionState = ({
  dataId,
  userId,
  firebaseRef,
}: useSubmissionProps) => {
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
  const clearApt = api.appointment.clearAppointment.useMutation({
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
  const [image, setImage] = useState<File | null>(null);
  const [notes, setNotes] = useState("");

  // CONTACT STATES
  const [contactState, setContactState] = useState({
    name: "",
    preferredPronouns: "",
    email: "",
    phoneNumber: "",
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
      requiresConsultation: false,
      consultationDate: "",
      sessions: "0",
      appointmentDates: [],
      deposit: false,
      reason: "",
      other: "",
      referral: "",
    });

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
        appointmentId: dataId,
        firebaseRef,
        referenceImageURL,
      });
      toast.success("Image uploaded successfully!");
      setImage(null);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [dataId, image, addReferenceImage]);

  const handleDeleteImage = useCallback(async () => {
    if (!firebaseRef) return;
    try {
      setIsLoading(true);
      const imageRef = ref(storage, firebaseRef);
      await deleteObject(imageRef);
      removeReferenceImage.mutate({ appointmentId: dataId });
      toast.success("Image deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [firebaseRef, removeReferenceImage, dataId]);

  const handleUpdateAppointment = useCallback(
    async (evt: SyntheticEvent) => {
      evt.preventDefault();
      const { name, preferredPronouns, email, phoneNumber } = contactState;
      const { description, placement, size, color } = tattooState;
      const {
        accepted,
        requiresConsultation,
        consultationDate,
        sessions,
        appointmentDates,
        deposit,
        reason,
        other,
        referral,
      } = appointmentState;

      if (!name) return toast.error("Name field is missing.");
      if (!email) return toast.error("Email field is missing.");
      if (!phoneNumber) return toast.error("Phone number field is missing.");
      if (!description) return toast.error("Description field is missing.");
      if (!size) return toast.error("Size field is missing.");
      if (!placement) return toast.error("Placement field is missing.");
      if (!color) return toast.error("Color field is missing.");

      try {
        setIsLoading(true);
        updateFormInformation.mutate({
          id: dataId,
          name,
          preferredPronouns,
          email,
          phoneNumber,
          description,
          placement,
          size,
          color,
        });
        if (accepted) {
          updateAcceptedApt.mutate({
            id: dataId,
            accepted,
            requiresConsultation,
            consultationDate,
            sessionsAmount: sessions,
            appointmentDates: appointmentDates.filter((apt) => apt.date !== ""),
            depositPaid: deposit,
          });
          setAppointmentState((prev) => ({
            ...prev,
            reason: "",
            other: "",
            referral: "",
          }));
        }
        if (accepted === false) {
          updateRejectedApt.mutate({
            id: dataId,
            rejectionReason: reason,
            otherReason: other,
            tattooReferral: referral,
          });
          setAppointmentState((prev) => ({
            ...prev,
            requiresConsultation: false,
            sessions: "0",
          }));
        }
        if (accepted === null) {
          clearApt.mutate({
            id: dataId,
          });
        }
        if (image) await uploadImage();

        if (notes.length) {
          createNote.mutate({
            userId,
            appointmentId: dataId,
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
      dataId,
      contactState,
      tattooState,
      appointmentState,
      createNote,
      updateAcceptedApt,
      updateFormInformation,
      updateRejectedApt,
      clearApt,
      image,
      uploadImage,
      notes,
      userId,
    ]
  );

  return {
    contactState,
    setContactState,
    tattooState,
    setTattooState,
    appointmentState,
    setAppointmentState,
    isLoading,
    editEnabled,
    setEditEnabled,
    displaySection,
    setDisplaySection,
    setImage,
    notes,
    setNotes,
    handleUpdateAppointment,
    handleDeleteNote,
    uploadImage,
    handleDeleteImage,
  };
};
export default useSubmissionState;
