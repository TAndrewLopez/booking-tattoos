import { type Dispatch, type SetStateAction } from "react";

interface SubFilterProps {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
}

const SubFilter: React.FC<SubFilterProps> = ({ filters, setFilters }) => {
  const toggleFilterOption = (val: string) => {
    if (filters.includes(val)) {
      setFilters(() => filters.filter((filter) => filter !== val));
      return;
    }
    setFilters((prev) => [...prev, val]);
  };

  return (
    <div className="grow">
      <p className="mb-2 font-bold">Filter Options:</p>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="accepted">
            Accepted
          </label>
          <input
            id="accepted"
            type="checkbox"
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
            onChange={() => toggleFilterOption("rejected")}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="response">
            Colored
          </label>
          <input
            id="response"
            type="checkbox"
            onChange={() => toggleFilterOption("colored")}
          />
        </div>
      </div>
    </div>
  );
};

export default SubFilter;
