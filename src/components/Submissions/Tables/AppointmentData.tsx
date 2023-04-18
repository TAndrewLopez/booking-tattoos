import { type Dispatch, type SetStateAction } from "react";

interface AppointmentDataProps {
  editEnabled: boolean;
  accepted: boolean | null;
  consultation: boolean;
  consultationDate: string;
  deposit: boolean;
  sessions: string;
  setConsultationDate: Dispatch<SetStateAction<string>>;
  setDeposit: Dispatch<SetStateAction<boolean>>;
  refImage: boolean;
}

const AppointmentData: React.FC<AppointmentDataProps> = ({
  editEnabled,
  accepted,
  consultation,
  consultationDate,
  deposit,
  sessions,
  setConsultationDate,
  setDeposit,
  refImage,
}) => {
  const sessionsArray = new Array(Number(sessions)).fill("null");

  return (
    <>
      <h2 className="text-center font-semibold">Appointment Data</h2>
      {accepted ? (
        <table>
          <tbody>
            {consultation && (
              <tr>
                <td className="p-1 text-sm">
                  <label className="mr-2" htmlFor="consultation-date">
                    Consultation Date:
                  </label>
                </td>
                <td className="text-right">
                  <input
                    id="consultation-date"
                    className="px-2 outline-dashed outline-1"
                    type="date"
                    disabled={!editEnabled}
                    value={consultationDate}
                    onChange={(evt) => {
                      setConsultationDate(evt.target.value);
                    }}
                  />
                </td>
              </tr>
            )}
            {/* <tr>
              <td className="text-sm">Appointment Date</td>
              <td className="text-right">
                <input type="datetime-local" />
              </td>
            </tr> */}
            {sessionsArray.map((item, i) => (
              <tr key={`${item as string}${i}`}>
                <td className="text-sm">Appointment Date</td>
                <td className="text-right">
                  <input type="datetime-local" />
                </td>
              </tr>
            ))}
            <tr>
              <td className="p-1 text-sm">
                <label className="mr-2" htmlFor="deposit">
                  Deposit Paid:
                </label>
              </td>
              <td className="text-right">
                <input
                  className="h-4 w-4"
                  id="deposit"
                  type="checkbox"
                  disabled={!editEnabled}
                  checked={deposit}
                  onChange={() => setDeposit(!deposit)}
                />
              </td>
            </tr>
            <tr>
              <td className="p-1 text-sm">
                <label className="mr-2" htmlFor="references">
                  Reference Image:
                </label>
              </td>
              <td className="text-right">
                <input
                  className="h-4 w-4"
                  id="references"
                  type="checkbox"
                  disabled={!editEnabled}
                  checked={refImage}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="flex h-full items-center justify-center text-sm text-neutral-400">
          Client&apos;s request has not been accepted.
        </p>
      )}
    </>
  );
};

export default AppointmentData;
