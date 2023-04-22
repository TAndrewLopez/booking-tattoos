import type { AppointmentStateInterface } from "@/types";
import { type Dispatch, type SetStateAction } from "react";

interface AppointmentDataProps {
  editEnabled: boolean;
  appointmentState: AppointmentStateInterface;
  setAppointmentState: Dispatch<SetStateAction<AppointmentStateInterface>>;
  refImage: boolean;
}

const AppointmentData: React.FC<AppointmentDataProps> = ({
  editEnabled,
  appointmentState: { accepted, consultation, deposit, sessions },
  setAppointmentState,
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
                    className="px-2 outline-dashed outline-1 outline-gray-300"
                    type="date"
                    disabled={!editEnabled}
                    onChange={({ target }) =>
                      setAppointmentState((prev) => ({
                        ...prev,
                        consultationDate: target.value,
                      }))
                    }
                  />
                </td>
              </tr>
            )}

            {sessionsArray.map((item, i) => (
              <tr key={`${item as string}${i}`}>
                <td className="text-sm">Appt. Date {`${i + 1}`}</td>
                <td className="text-right">
                  <input
                    type="date"
                    className="px-2 outline-dashed outline-1 outline-gray-300"
                    disabled={!editEnabled}
                    // value={sessionDates[i]?.slice(0, 10) || ""}
                    // onChange={({ target }) => {
                    //   const dates = [...sessionDates];
                    //   dates[i] = new Date(
                    //     `${target.value} 12:30:00`
                    //   ).toISOString();
                    //   setAppointmentState((prev) => ({
                    //     ...prev,
                    //     sessionDates: [...dates],
                    //   }));
                    // }}
                  />
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
                  onChange={() =>
                    setAppointmentState((prev) => ({
                      ...prev,
                      deposit: !deposit,
                    }))
                  }
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
