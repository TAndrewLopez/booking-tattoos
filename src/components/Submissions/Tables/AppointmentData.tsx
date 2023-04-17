import { type Dispatch, type SetStateAction } from "react";

interface AppointmentDataProps {
  accepted: boolean | null;
  consultation: boolean;
  editEnabled: boolean;
  consultationDate: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
  deposit: {
    value: boolean;
    set: Dispatch<SetStateAction<boolean>>;
  };
}

const AppointmentData: React.FC<AppointmentDataProps> = ({
  accepted,
  consultation,
  editEnabled,
  consultationDate,
  deposit,
}) => {
  return (
    <>
      <h2 className="text-center font-semibold">Appointment Data</h2>
      {accepted ? (
        <table>
          <tbody>
            {consultation && (
              <tr>
                <td className="text-sm">Consultation Date</td>
                <td className="text-right">
                  <input type="date" />
                </td>
              </tr>
            )}
            {/* <tr>
              <td className="text-sm">Appointment Date</td>
              <td className="text-right">
                <input type="datetime-local" />
              </td>
            </tr> */}
            <tr>
              <td className="text-sm">Deposit Paid</td>
              <td className="text-right">
                <input type="checkbox" />
              </td>
            </tr>
            <tr>
              <td className="text-sm">Reference Images</td>
              <td className="text-right">
                <input type="checkbox" />
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
