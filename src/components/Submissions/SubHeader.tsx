import { type Dispatch, type SetStateAction } from "react";
import SubFilter from "./SubFilter";
import SubSearch from "./SubSearch";

interface SubHeaderProps {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
}

const SubHeader: React.FC<SubHeaderProps> = ({ filters, setFilters }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <SubFilter filters={filters} setFilters={setFilters} />
      {/* <SubSearch /> */}
    </div>
  );
};

export default SubHeader;
