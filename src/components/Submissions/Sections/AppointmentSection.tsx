import { type AppointmentInputs } from "@/types";
import { useState } from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes } from "firebase/storage";
import * as uuid from "uuid";
import { toast } from "react-hot-toast";

interface AppointmentSectionProps {
  editEnabled: boolean;
  inputs: AppointmentInputs;
}

const AppointmentSection: React.FC<AppointmentSectionProps> = ({
  editEnabled,
  inputs: { consultation, consultationDate, accepted, deposit, references },
}) => {
  const [image, setImage] = useState<File | null>(null);
  const uploadImage = async () => {
    try {
      if (image === null) return;
      const imageRef = ref(
        storage,
        `referenceImages/${image?.name + uuid.v4()}`
      );
      await uploadBytes(imageRef, image);
      toast.success("Image Upload Successful");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="space-y-2 p-3">
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col bg-green-200">
          <h2 className="text-center font-semibold">Initial Review</h2>
        </div>
        <div className="col-span-1 bg-blue-200">
          <h2>Appointment Data</h2>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="references">Reference Images</label>
        <input
          type="file"
          onChange={({ target }) => {
            if (!target.files) return;
            if (!target.files[0]) return;
            setImage(target.files[0]);
          }}
        />
        <button onClick={() => void uploadImage()}>Upload Image</button>
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
