import { type Appointment } from "@/types";
import InitialReview from "../Tables/InitialReview";
import AppointmentData from "../Tables/AppointmentData";
import ReferenceImage from "../Tables/ReferenceImage";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import moment from "moment";

interface AppointmentSectionProps {
  data: Appointment;
  editEnabled: boolean;
  accepted: boolean | null;
  consultation: boolean;
  sessions: string;
  consultationDate: string;
  deposit: boolean;
  setAccepted: Dispatch<SetStateAction<boolean | null>>;
  setConsultation: Dispatch<SetStateAction<boolean>>;
  setSessions: Dispatch<SetStateAction<string>>;
  setConsultationDate: Dispatch<SetStateAction<string>>;
  setDeposit: Dispatch<SetStateAction<boolean>>;
  setImage: Dispatch<SetStateAction<File | null>>;
  uploadImage: () => Promise<void>;
  imageURL: string | null;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  data,
  editEnabled,
  accepted,
  consultation,
  sessions,
  consultationDate,
  deposit,
  setAccepted,
  setConsultation,
  setSessions,
  setConsultationDate,
  setDeposit,
  setImage,
  uploadImage,
  imageURL,
}) => {
  // INITIAL VALUES
  useEffect(() => {
    setAccepted(data.accepted);
    if (data.requiresConsultation) setConsultation(data.requiresConsultation);
    if (data.consultationDate)
      setConsultationDate(
        moment(data.consultationDate.toISOString()).format("yyyy-MM-DD")
      );
    if (data.sessionsAmount) setSessions(data.sessionsAmount ?? "0");
    if (data.depositPaid) setDeposit(data.depositPaid);
  }, [
    data.accepted,
    data.requiresConsultation,
    data.sessionsAmount,
    data.consultationDate,
    data.depositPaid,
    setAccepted,
    setConsultation,
    setSessions,
    setConsultationDate,
    setDeposit,
  ]);
  return (
    <section className="space-y-2 p-3">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="col-span-1 flex flex-col border border-dashed border-gray-200 p-1">
          <InitialReview
            editEnabled={editEnabled}
            accepted={accepted}
            consultation={consultation}
            sessions={sessions}
            setAccepted={setAccepted}
            setConsultation={setConsultation}
            setSessions={setSessions}
          />
        </div>
        <div className="col-span-1 flex flex-col border border-dashed border-gray-200 p-1">
          <AppointmentData
            editEnabled={editEnabled}
            consultation={consultation}
            accepted={accepted}
            consultationDate={consultationDate}
            deposit={deposit}
            setConsultationDate={setConsultationDate}
            setDeposit={setDeposit}
            refImage={data.referenceImageURL ? true : false}
          />
        </div>
      </div>

      {/* REFERENCE IMAGES */}
      <div className="flex flex-col">
        <ReferenceImage
          editEnabled={editEnabled}
          setImage={setImage}
          uploadImage={uploadImage}
          imageURL={imageURL}
        />
      </div>
    </section>
  );
};

export default AppointmentSection;
