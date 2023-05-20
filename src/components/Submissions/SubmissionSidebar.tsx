import type { Dispatch, ReactNode, SetStateAction } from "react";
import SearchInput from "../Inputs/SearchInput";
import Filter from "../Filter/Filter";
import { BiFilterAlt } from "react-icons/bi";
import SlideFromLeftSidebar from "../AnimatedContainers/FromLeftSidebar";

interface SubmissionSidebarProps {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  footerChildren?: ReactNode;
}

const SubmissionSidebar: React.FC<SubmissionSidebarProps> = ({
  filters,
  setFilters,
  search,
  setSearch,
  footerChildren,
}) => {
  return (
    <SlideFromLeftSidebar padded border>
      <SubHeader title="Search" />
      <SearchInput
        showSearchIcon
        placeholder="Search name or email"
        search={search}
        setSearch={setSearch}
      />

      <SubHeader
        padded
        title="Filters"
        icon={<BiFilterAlt className="inline-block" size={20} />}
        utilityName="Clear"
        utilityAction={() => setFilters([])}
      />
      <Filter filters={filters} setFilters={setFilters} />

      {footerChildren && (
        <footer className="mt-10 border-t text-sm">
          <div className="mt-3">{footerChildren}</div>
        </footer>
      )}
    </SlideFromLeftSidebar>
  );
};

export default SubmissionSidebar;

interface SubHeaderProps {
  title: string;
  icon?: ReactNode;
  padded?: boolean;
  utilityName?: string;
  utilityAction?: () => void;
}

function SubHeader({
  title,
  icon,
  padded,
  utilityName,
  utilityAction,
}: SubHeaderProps) {
  return (
    <div
      className={`flex items-center justify-between border-b 
      ${padded ? "mb-10" : ""}`}
    >
      <h3 className="text-xl font-bold">
        {title}: {icon && icon}
      </h3>
      {utilityName && (
        <p
          onClick={utilityAction}
          className="cursor-pointer text-blue-500 hover:text-blue-700"
        >
          {utilityName}
        </p>
      )}
    </div>
  );
}
