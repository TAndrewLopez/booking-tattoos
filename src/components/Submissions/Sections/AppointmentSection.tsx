import { type Appointment, type AppointmentInputs } from "@/types";
import InitialReview from "../Tables/InitialReview";
import AppointmentData from "../Tables/AppointmentData";
import ReferenceImage from "../Tables/ReferenceImage";
import { useEffect } from "react";
import moment from "moment";

interface AppointmentSectionProps {
  data: Appointment;
  editEnabled: boolean;
  inputs: AppointmentInputs;
  uploadImage: () => Promise<void>;
  imageURL: string | null;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  data,
  editEnabled,
  inputs: {
    accepted,
    consultation,
    consultationDate,
    sessions,
    deposit,
    image,
  },
  uploadImage,
  imageURL,
}) => {
  // INITIAL VALUES
  useEffect(() => {
    accepted.set(data.accepted);
    if (data.requiresConsultation) consultation.set(data.requiresConsultation);
    if (data.consultationDate)
      consultationDate.set(
        moment(data.consultationDate.toISOString()).format("yyyy-MM-DD")
      );
    if (data.sessionsAmount) sessions.set(data.sessionsAmount ?? "0");
    if (data.depositPaid) deposit.set(data.depositPaid);
  }, [
    data.accepted,
    data.requiresConsultation,
    data.sessionsAmount,
    data.consultationDate,
    data.depositPaid,
    accepted,
    consultation,
    sessions,
    consultationDate,
    deposit,
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
          />
        </div>
        <div className="col-span-1 flex flex-col border border-dashed border-gray-200 p-1">
          <AppointmentData
            consultation={consultation.value}
            accepted={accepted.value}
            editEnabled={editEnabled}
            consultationDate={consultationDate}
            deposit={deposit}
            refImage={data.referenceImageURL ? true : false}
          />
        </div>
      </div>

      {/* REFERENCE IMAGES */}
      <div className="flex flex-col">
        <ReferenceImage
          editEnabled={editEnabled}
          image={image}
          uploadImage={uploadImage}
          imageURL={imageURL}
        />
      </div>
    </section>
  );
};

export default AppointmentSection;
