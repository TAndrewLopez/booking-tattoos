import type { Dispatch, SetStateAction } from "react";
import AppointmentData from "../Tables/AppointmentData";
import InitialReview from "../Tables/InitialReview";
import ReferenceImage from "../Tables/ReferenceImage";
import type { AppointmentStateInterface } from "@/types";
import SubSection from "./SubSection";

interface AppointmentSectionProps {
  editEnabled: boolean;
  appointmentState: AppointmentStateInterface;
  setAppointmentState: Dispatch<SetStateAction<AppointmentStateInterface>>;
  setImage: Dispatch<SetStateAction<File | null>>;
  uploadImage: () => Promise<void>;
  deleteImage: () => Promise<void>;
  imageURL: string | null;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  editEnabled,
  appointmentState,
  setAppointmentState,
  setImage,
  uploadImage,
  deleteImage,
  imageURL,
}) => {
  const { accepted } = appointmentState;
  return (
    <SubSection>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="col-span-1 flex flex-col border border-dashed border-gray-200 p-1">
          <InitialReview
            editEnabled={editEnabled}
            appointmentState={appointmentState}
            setAppointmentState={setAppointmentState}
          />
        </div>
        <div className="col-span-1 flex flex-col border border-dashed border-gray-200 p-1">
          <AppointmentData
            editEnabled={editEnabled}
            appointmentState={appointmentState}
            setAppointmentState={setAppointmentState}
            refImage={imageURL ? true : false}
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
    </SubSection>
  );
};

export default AppointmentSection;
