import { type Dispatch, type SetStateAction } from "react";

interface SubFilterProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
}

const SubFilter: React.FC<SubFilterProps> = ({ filter, setFilter }) => {
  const toggleFilterOption = (val: string) => {
    if (filter === val) {
      setFilter("");
      return;
    }
    setFilter(val);
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
            checked={filter === "accepted"}
            onChange={() => toggleFilterOption("accepted")}
            // onChange={() => testToggleFilterOption("accepted")}
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
            // onChange={() => testToggleFilterOption("rejected")}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="response">
            Colored
          </label>
          <input
            id="response"
            type="checkbox"
            checked={filter === "colored"}
            onChange={() => toggleFilterOption("colored")}
            // onChange={() => testToggleFilterOption("colored")}
          />
        </div>
        <div className="flex flex-col items-center gap-1">
          <label className="text-xs font-semibold" htmlFor="response">
            Black & Grey
          </label>
          <input
            id="response"
            type="checkbox"
            checked={filter === "black & grey"}
            onChange={() => toggleFilterOption("black & grey")}
            // onChange={() => testToggleFilterOption("black & grey")}
          />
        </div>
      </div>
    </div>
  );
};

export default SubFilter;
