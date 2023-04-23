import useSubmission from "@/hooks/useSubmission";
import type { Appointment } from "@/types";
import { useCallback, useEffect } from "react";
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

const SubCard: React.FC<SubCardProps> = ({ userId, data }) => {
  const {
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
  } = useSubmission({
    dataId: data.id,
    userId,
    firebaseRef: data.firebaseRef,
  });

  // SET INITIAL VALUES
  const setDefaultStates = useCallback(() => {
    setContactState({
      name: data.name,
      preferredPronouns: data.preferredPronouns,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });

    setTattooState({
      description: data.description,
      size: data.size,
      placement: data.placement,
      color: data.color,
    });

    setAppointmentState({
      accepted: data.accepted,
      requiresConsultation: data.requiresConsultation || false,
      consultationDate: data.consultationDate || "",
      sessions: data.sessionsAmount || "0",
      appointmentDates:
        data.appointmentDates
          .filter((apt) => apt.type === "appointment")
          .map((dateObj) => dateObj.date.toISOString()) || [],
      deposit: data.depositPaid || false,
      reason: data.rejectionReason || "",
      referral: data.tattooReferral || "",
    });
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
    data.consultationDate,
    data.sessionsAmount,
    data.appointmentDates,
    data.depositPaid,
    data.rejectionReason,
    data.tattooReferral,
    setAppointmentState,
    setContactState,
    setTattooState,
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
          <button
            onClick={(evt) => void handleUpdateAppointment(evt)}
            className="flex w-full items-center justify-center rounded-md bg-emerald-200 px-3 py-2 text-emerald-900 hover:bg-emerald-900 hover:text-white disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50"
            disabled={!editEnabled}
          >
            {isLoading ? <ClipLoader size={24} color="blue" /> : "Save"}
          </button>
        </div>
      )}
    </div>
  );
};

export default SubCard;
