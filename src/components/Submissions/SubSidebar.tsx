import type { Dispatch, SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";

interface SubSidebarProps {
  filter: string;
  setFilter: Dispatch<SetStateAction<string>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SubSidebar: React.FC<SubSidebarProps> = ({
  filter,
  setFilter,
  search,
  setSearch,
}) => {
  return (
    <aside className="sticky top-4 hidden h-fit w-2/5 border-r px-1.5 shadow-lg md:block">
      <h3 className="border-b text-xl font-bold">Search:</h3>
      <div className="my-5 hidden items-center gap-2 rounded border-2 px-2 py-1 md:flex">
        <label htmlFor="search">
          <FiSearch size={24} />
        </label>
        <input
          id="search"
          type="search"
          placeholder="Search client by name or email"
          className="w-full p-2 outline-none placeholder:text-sm"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
        />
      </div>
      <h3 className="mb-10 border-b text-xl font-bold">Filters:</h3>
      <div>
        <p className="text-sm">Requires Consultation</p>
      </div>
    </aside>
  );
};

export default SubSidebar;
