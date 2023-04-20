import { type Dispatch, type SetStateAction } from "react";

interface InitialReviewProps {
  editEnabled: boolean;
  accepted: boolean | null;
  reason: string;
  referral: string;
  consultation: boolean;
  sessions: string;
  setAccepted: Dispatch<SetStateAction<boolean | null>>;
  setReason: Dispatch<SetStateAction<string>>;
  setReferral: Dispatch<SetStateAction<string>>;
  setConsultation: Dispatch<SetStateAction<boolean>>;
  setSessions: Dispatch<SetStateAction<string>>;
}

type Rejection = {
  value: string;
  reason: string;
};

const REJECTION_REASON: Rejection[] = [
  { value: "", reason: "Select Reason" },
  { value: "fine-line", reason: "Fine line tattoo" },
  { value: "portrait", reason: "Portrait tattoo" },
  { value: "script", reason: "Text/Scripts" },
];

type Referral = {
  name: string;
  value: string;
};

const TATTOO_REFERRALS: Referral[] = [
  { name: "Select Referral", value: "" },
  { name: "George Perham", value: "George Perham" },
  { name: "Alex Harris", value: "Alex Harris" },
  { name: "Mikki Bedol", value: "Mikki Bedol" },
  { name: "Jodi Longo", value: "Jodi Longo" },
  { name: "Steve Cacioppo", value: "Steve Cacioppo" },
];

const InitialReview: React.FC<InitialReviewProps> = ({
  editEnabled,
  accepted,
  reason,
  referral,
  consultation,
  sessions,
  setAccepted,
  setReason,
  setReferral,
  setConsultation,
  setSessions,
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
                  setAccepted(() => {
                    if (accepted) {
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
                      accepted === true
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
                  setAccepted(() => {
                    if (accepted === false) {
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
                  accepted === false
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
          {accepted && (
            <>
              <tr>
                <td className="p-1 text-sm">
                  <label htmlFor="consultation">Requires Consultation:</label>
                </td>
                <td className="p-1 text-right">
                  <input
                    className="h-4 w-4"
                    id="consultation"
                    type="checkbox"
                    disabled={!editEnabled}
                    checked={consultation}
                    onChange={() => setConsultation(!consultation)}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-1 text-sm">
                  <label htmlFor="sessions">No. of Sessions:</label>
                </td>
                <td className="p-1 text-right">
                  <input
                    className="w-1/4 text-right"
                    id="sessions"
                    type="number"
                    value={sessions}
                    onChange={(evt) => setSessions(evt.target.value)}
                  />
                </td>
              </tr>
            </>
          )}
          {accepted === false && (
            <>
              <tr>
                <td className="p-1 text-sm">
                  <label htmlFor="reason">Reason:</label>
                </td>
                <td className="p-1 text-right">
                  <select
                    id="reason"
                    disabled={!editEnabled}
                    value={reason}
                    onChange={(evt) => setReason(evt.target.value)}
                  >
                    {REJECTION_REASON.map(({ value, reason }, i) => (
                      <option value={value} key={`${reason}${i}`}>
                        {reason}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="p-1 text-sm">
                  <label htmlFor="referral">Referral:</label>
                </td>
                <td className="p-1 text-right">
                  <select
                    id="referral"
                    disabled={!editEnabled}
                    value={referral}
                    onChange={(evt) => setReferral(evt.target.value)}
                  >
                    {TATTOO_REFERRALS.map(({ name, value }, i) => (
                      <option value={value} key={`${name}${i}`}>
                        {name}
                      </option>
                    ))}
                  </select>
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
