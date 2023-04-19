import { type Appointment } from "@/types";
import type { Dispatch, SetStateAction } from "react";
import AppointmentData from "../Tables/AppointmentData";
import InitialReview from "../Tables/InitialReview";
import ReferenceImage from "../Tables/ReferenceImage";

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
  deleteImage: () => Promise<void>;
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
  deleteImage,
  imageURL,
}) => {
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
            sessions={sessions}
            setConsultationDate={setConsultationDate}
            setDeposit={setDeposit}
            refImage={data.referenceImageURL ? true : false}
          />
        </div>
      </div>

      {/* REFERENCE IMAGES */}
      <div className="flex flex-col">
        <ReferenceImage
          editEnabled={accepted && editEnabled}
          setImage={setImage}
          uploadImage={uploadImage}
          deleteImage={deleteImage}
          imageURL={imageURL}
        />
      </div>
    </section>
  );
};

export default AppointmentSection;
