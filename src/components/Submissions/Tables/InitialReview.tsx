import { type Dispatch, type SetStateAction } from "react";

interface InitialReviewProps {
  editEnabled: boolean;
  accepted: {
    value: boolean | null;
    set: Dispatch<SetStateAction<boolean | null>>;
  };
  consultation: {
    value: boolean;
    set: Dispatch<SetStateAction<boolean>>;
  };
  sessions: {
    value: string;
    set: Dispatch<SetStateAction<string>>;
  };
}

const InitialReview: React.FC<InitialReviewProps> = ({
  editEnabled,
  accepted,
  consultation,
  sessions,
}) => {
  return (
    <>
      <h2 className="text-center font-semibold">Initial Review</h2>
      <table>
        <tbody>
          <tr>
            <td className="p-1">
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
                    rounded-md px-2 py-1
                    hover:text-white 
                    disabled:cursor-not-allowed 
                    ${
                      accepted.value
                        ? "bg-emerald-900 text-white"
                        : "bg-emerald-200 text-emerald-900 hover:bg-emerald-900 disabled:bg-neutral-400 disabled:text-neutral-50"
                    }
                    `}
                disabled={!editEnabled}
              >
                Accept
              </button>
            </td>
            <td className="p-1 text-right">
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
                rounded-md px-2 py-1
                hover:text-white 
                disabled:cursor-not-allowed
                ${
                  accepted.value === false
                    ? "bg-red-900 text-white"
                    : "bg-red-200 text-red-900 hover:bg-red-900 disabled:bg-neutral-400 disabled:text-neutral-50"
                }
                `}
                disabled={!editEnabled}
              >
                Rejected
              </button>
            </td>
          </tr>
          {accepted.value && (
            <>
              <tr>
                <td className="p-1 text-sm">
                  <label htmlFor="consultation">Requires Consultation</label>
                </td>
                <td className="p-1 text-right">
                  <input
                    className="h-4 w-4"
                    id="consultation"
                    type="checkbox"
                    disabled={!editEnabled}
                    checked={consultation.value}
                    onChange={() => consultation.set(!consultation.value)}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-1 text-sm">
                  <label htmlFor="sessions"> No. of Sessions</label>
                </td>
                <td className="p-1 text-right">
                  <input
                    className="w-1/4 text-right"
                    id="sessions"
                    type="number"
                    value={sessions.value}
                    onChange={(evt) => sessions.set(evt.target.value)}
                  />
                </td>
              </tr>
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default InitialReview;
