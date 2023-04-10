import { type Dispatch, type SetStateAction } from "react";
import SubFilter from "./SubFilter";
import SubSearch from "./SubSearch";

interface SubHeaderProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SubHeader: React.FC<SubHeaderProps> = ({
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  return (
    <div className="flex w-full items-center justify-between">
      <SubFilter filter={filter} setFilter={setFilter} />
      <SubSearch search={search} setSearch={setSearch} />
    </div>
  );
};

export default SubHeader;
