import { type AppointmentInputs } from "@/types";
import InitialReview from "../Tables/InitialReview";
import AppointmentData from "../Tables/AppointmentData";
import ReferenceImage from "../Tables/ReferenceImage";

interface AppointmentSectionProps {
  editEnabled: boolean;
  inputs: AppointmentInputs;
  uploadImage: () => Promise<void>;
  imageURL: string | null;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  editEnabled,
  inputs: {
    consultation,
    consultationDate,
    accepted,
    deposit,
    image,
    sessions,
  },
  uploadImage,
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
          />
        </div>
        <div className="col-span-1 flex flex-col border border-dashed border-gray-200 p-1">
          <AppointmentData
            consultation={consultation.value}
            accepted={accepted.value}
            editEnabled={editEnabled}
            consultationDate={consultationDate}
            deposit={deposit}
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

/*
      <div className="flex flex-col gap-5 md:flex-row md:justify-between">
         REQUIRES CONSULTATION 
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div className="flex items-center">
            <label className="mr-2" htmlFor="consultation">
              Requires Consultation
            </label>
            <input
              className="h-4 w-4"
              id="consultation"
              type="checkbox"
              disabled={!editEnabled}
              checked={consultation.value}
              onChange={() => consultation.set(!consultation.value)}
            />
          </div>
          {consultation.value && (
            <div className="flex items-center">
              <label className="mr-2" htmlFor="consultation-date">
                Consultation Date:
              </label>
              <input
                id="consultation-date"
                className="px-2 outline-dashed outline-1"
                type="date"
                disabled={!editEnabled}
                value={consultationDate.value}
                onChange={(evt) => {
                  consultationDate.set(evt.target.value);
                }}
              />
            </div>
          )}
        </div>
        REQUIRES REFERENCES 
        <div className="flex flex-col gap-5 md:flex-row md:justify-between">
          <div className="flex items-center">
            <label className="mr-2" htmlFor="references">
              References Received
            </label>
            <input
              className="h-4 w-4"
              id="references"
              type="checkbox"
              disabled={!editEnabled}
              checked={references.value}
              onChange={() => references.set(!references.value)}
            />
          </div>
           REQUIRES DEPOSIT
          <div className="flex items-center">
            <label className="mr-2" htmlFor="deposit">
              Deposit Paid
            </label>
            <input
              className="h-4 w-4"
              id="deposit"
              type="checkbox"
              disabled={!editEnabled}
              checked={deposit.value}
              onChange={() => deposit.set(!deposit.value)}
            />
          </div>
        </div>
      </div>

      ACCEPTED/REJECTED BUTTONS 
      <div className="flex justify-between gap-4 md:justify-end">
        <button
          onClick={() =>
            accepted.set(() => {
              if (accepted.value === false) {
                return null;
              } else {
                return false;
              }
            })
          }
          className={`
                rounded-md px-3 py-2
                hover:text-white 
                disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50
                ${
                  accepted.value === false
                    ? "bg-red-900 text-white"
                    : "bg-red-200 text-red-900 hover:bg-red-900"
                }
                `}
          disabled={!editEnabled}
        >
          Rejected
        </button>
        <button
          onClick={() =>
            accepted.set(() => {
              if (accepted.value) {
                return null;
              } else {
                return true;
              }
            })
          }
          className={`
                rounded-md px-3 py-2
                hover:text-white 
                disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50
                ${
                  accepted.value
                    ? "bg-emerald-900 text-white"
                    : "bg-emerald-200 text-emerald-900 hover:bg-emerald-900"
                }
                `}
          disabled={!editEnabled}
        >
          Accept
        </button>
      </div>
*/