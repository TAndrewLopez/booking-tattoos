import { type Dispatch, type SetStateAction } from "react";
import { BiFilterAlt } from "react-icons/bi";

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
    <div>
      <div className="flex items-center gap-2">
        <h3 className="font-bold">Filters</h3>
        <BiFilterAlt size={20} />
      </div>

      <div className="hidden flex-wrap items-center gap-3 md:flex">
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="accepted">
            Consultations
          </label>
          <input
            id="consultations"
            type="checkbox"
            checked={filter === "consultations"}
            onChange={() => toggleFilterOption("consultations")}
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
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="response">
            Requires Refs
          </label>
          <input
            id="references"
            type="checkbox"
            checked={filter === "references"}
            onChange={() => toggleFilterOption("references")}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="response">
            Requires Deposits
          </label>
          <input
            id="deposit"
            type="checkbox"
            checked={filter === "deposit"}
            onChange={() => toggleFilterOption("deposit")}
          />
        </div>
      </div>
    </div>
  );
};

export default SubFilter;
