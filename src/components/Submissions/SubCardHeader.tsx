import EditIcon from "public/icons/EditIcon";

interface CardHeaderProps {
  displaySection: string;
  setDisplaySection: (val: string) => void;
  editEnabled: boolean;
  setEditEnabled: (val: boolean) => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  displaySection,
  setDisplaySection,
  editEnabled,
  setEditEnabled,
}) => {
  return (
    <ul
      className="flex rounded-t-lg border-b border-gray-200 bg-gray-50 text-center text-sm 
  font-medium text-gray-500"
    >
      <li className="mr-2">
        <button
          onClick={() => setDisplaySection("Contact")}
          className={`inline-block rounded-tl-lg p-4 hover:bg-gray-100
      ${
        displaySection === "Contact" ? "text-blue-600" : "hover:text-gray-600"
      }`}
        >
          Contact
        </button>
      </li>
      <li className="mr-2">
        <button
          onClick={() => setDisplaySection("Tattoo")}
          className={`inline-block p-4 hover:bg-gray-100
      ${displaySection === "Tattoo" ? "text-blue-600" : "hover:text-gray-600"}
      `}
        >
          Tattoo
        </button>
      </li>
      <li className="mr-2">
        <button
          onClick={() => setDisplaySection("Response")}
          className={`inline-block p-4 hover:bg-gray-100
      ${displaySection === "Response" ? "text-blue-600" : "hover:text-gray-600"}
      `}
        >
          Response
        </button>
      </li>
      <li className="flex items-center gap-4">
        <div onClick={() => setEditEnabled(!editEnabled)}>
          <EditIcon twClass="w-5 cursor-pointer hover:fill-neutral-500" />
        </div>
      </li>
    </ul>
  );
};

export default CardHeader;
