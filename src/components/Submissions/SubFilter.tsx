import { type Dispatch, type SetStateAction } from "react";

interface SubFilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const SubFilter: React.FC<SubFilterProps> = ({ filter, setFilter }) => {
  const toggleFilterOption = (val: string) => {
    if (filter === val) {
      return setFilter("");
    }
    setFilter(val);
  };

  return (
    <div className="grow">
      <p className="mb-2 font-bold">Filter Options:</p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="accepted">
            Consultations
          </label>
          <input
            id="consultation"
            type="checkbox"
            checked={filter === "consultation"}
            onChange={() => toggleFilterOption("consultation")}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="accepted">
            Accepted
          </label>
          <input
            id="accepted"
            type="checkbox"
            checked={filter === "accepted"}
            onChange={() => toggleFilterOption("accepted")}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="response">
            Rejected
          </label>
          <input
            id="response"
            type="checkbox"
            checked={filter === "rejected"}
            onChange={() => toggleFilterOption("rejected")}
          />
        </div>
      </div>
    </div>
  );
};

export default SubFilter;
