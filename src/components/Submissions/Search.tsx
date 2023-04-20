import { type Dispatch, type SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";

interface SubSearchProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SubSearch: React.FC<SubSearchProps> = ({ search, setSearch }) => {
  return (
    <div className="my-5 hidden items-center gap-2 rounded border-2 px-2 py-1 md:flex">
      <label htmlFor="search">
        <FiSearch size={24} />
      </label>
      <input
        id="search"
        type="search"
        placeholder="Search name or email"
        className="w-full p-2 outline-none placeholder:text-sm"
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
      />
    </div>
  );
};

export default SubSearch;
