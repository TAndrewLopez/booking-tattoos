import { type Dispatch, type SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";

interface SubSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

// TODO : CREATE UI FOR MOBILE SEARCH BAR

const SubSearch: React.FC<SubSearchProps> = ({ search, setSearch }) => {
  return (
    <div className="md:grow">
      {/* MOBILE SEARCH INPUT AND ICON */}
      <div className="flex justify-end md:hidden">
        <FiSearch size={24} />
      </div>

      {/* DESKTOP SEARCH */}
      <div className="hidden items-center gap-2 rounded border-2 px-2 py-1 md:flex">
        <label htmlFor="search">
          <FiSearch size={24} />
        </label>
        <input
          id="search"
          type="search"
          placeholder="search by client name"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          className="w-full p-2 outline-none"
        />
      </div>
    </div>
  );
};

export default SubSearch;
