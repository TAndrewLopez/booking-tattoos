import { FiSearch } from "react-icons/fi";

const SubSearch = () => {
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
          className="w-full p-2 outline-none"
        />
      </div>
    </div>
  );
};

export default SubSearch;
