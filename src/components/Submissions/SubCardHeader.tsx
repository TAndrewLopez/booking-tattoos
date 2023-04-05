import Button from "../Form/Inputs/Button";

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
      className="flex flex-wrap rounded-t-lg 
      border-b border-gray-200 bg-gray-50 
      text-center text-sm font-medium text-gray-500"
    >
      <li>
        <button
          onClick={() => setDisplaySection("Contact")}
          className={`inline-block rounded-tl-lg p-4 hover:bg-gray-100
          ${
            displaySection === "Contact"
              ? "text-blue-600"
              : "hover:text-gray-600"
          }`}
        >
          Contact
        </button>
      </li>
      <li>
        <button
          onClick={() => setDisplaySection("Tattoo")}
          className={`inline-block p-4 hover:bg-gray-100
          ${
            displaySection === "Tattoo"
              ? "text-blue-600"
              : "hover:text-gray-600"
          }
      `}
        >
          Tattoo
        </button>
      </li>
      <li>
        <button
          onClick={() => setDisplaySection("Response")}
          className={`inline-block p-4 hover:bg-gray-100
          ${
            displaySection === "Response"
              ? "text-blue-600"
              : "hover:text-gray-600"
          }
      `}
        >
          Response
        </button>
      </li>
      <li className="mr-2 flex grow items-center justify-end">
        <Button
          type={editEnabled ? "details" : "error"}
          label={editEnabled ? "Edit" : "Cancel"}
          onClick={() => {
            setEditEnabled(!editEnabled);
          }}
        />
      </li>
    </ul>
  );
};

export default CardHeader;
