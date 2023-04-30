import type { Dispatch, SetStateAction } from "react";
import Search from "./Search";
import Filter from "./Filter";
import { BiFilterAlt } from "react-icons/bi";
import useAppointmentState from "@/hooks/useAppointmentState";

interface SubSidebarProps {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SubSidebar: React.FC<SubSidebarProps> = ({
  filters,
  setFilters,
  search,
  setSearch,
}) => {
  const { aptData } = useAppointmentState();
  return (
    <aside className="sticky top-[80px] hidden h-fit w-1/5 min-w-[300px] rounded border p-4 shadow-lg md:block">
      <h3 className="border-b text-xl font-bold">Search:</h3>
      <Search search={search} setSearch={setSearch} />

      <div className="mb-10 flex items-center justify-between border-b">
        <h3 className="text-xl font-bold">
          Filters:
          <BiFilterAlt className="inline-block" size={20} />
        </h3>
        <p
          onClick={() => setFilters([])}
          className="cursor-pointer text-blue-500 hover:text-blue-700"
        >
          Clear
        </p>
      </div>
      <Filter filters={filters} setFilters={setFilters} />

      <div className="mt-10 border-t text-sm">
        <p className="mt-3">
          Total Submissions: <span>{aptData?.length}</span>
        </p>
      </div>
    </aside>
  );
};

export default SubSidebar;
