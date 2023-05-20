import { type Dispatch, type SetStateAction } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  showSearchIcon: boolean;
  placeholder?: string;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

/*
  COMPONENT PARAMS
    SHOW SEARCH ICON 
    PLACEHOLDER
    SEARCH STATE VALUE
    SEARCH STATE SET VALUE FUNC
*/

const SearchInput: React.FC<SearchInputProps> = ({
  showSearchIcon,
  placeholder,
  search,
  setSearch,
}) => {
  return (
    <div className="my-5 hidden items-center gap-2 rounded border-2 px-2 py-1 md:flex">
      {showSearchIcon && (
        <label htmlFor="search">
          <FiSearch size={24} />
        </label>
      )}
      <input
        id="search"
        type="search"
        placeholder={placeholder ? placeholder : "search"}
        className="w-full p-2 outline-none placeholder:text-sm"
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
      />
    </div>
  );
};

export default SearchInput;
