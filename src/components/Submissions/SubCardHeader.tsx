import Button from "../Form/Inputs/Button";

interface CardHeaderProps {
  setDefaultStates: () => void;
  displaySection: string;
  setDisplaySection: (val: string) => void;
  editEnabled: boolean;
  setEditEnabled: (val: boolean) => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  setDefaultStates,
  displaySection,
  setDisplaySection,
  editEnabled,
  setEditEnabled,
}) => {
  return (
    <ul
      className="flex flex-col rounded-t-lg border-b 
      border-gray-200 bg-gray-50 text-center 
      text-sm font-medium text-gray-500 sm:flex-row"
    >
      <div className="flex w-full sm:flex-row">
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
            onClick={() => setDisplaySection("Appointment")}
            className={`inline-block p-4 hover:bg-gray-100
          ${
            displaySection === "Appointment"
              ? "text-blue-600"
              : "hover:text-gray-600"
          }
      `}
          >
            Appts.
          </button>
        </li>
        <li>
          <button
            onClick={() => setDisplaySection("Notes")}
            className={`inline-block p-4 hover:bg-gray-100
          ${
            displaySection === "Notes" ? "text-blue-600" : "hover:text-gray-600"
          }
      `}
          >
            Notes
          </button>
        </li>
      </div>

      <li className="mr-2 flex grow items-center justify-end">
        <div className="w-full p-2 sm:w-auto">
          <Button
            fullSize
            type={editEnabled ? "error" : "details"}
            label={editEnabled ? "Cancel" : "Edit"}
            onClick={() => {
              if (editEnabled) setDefaultStates();
              setEditEnabled(!editEnabled);
            }}
          />
        </div>
      </li>
    </ul>
  );
};

export default CardHeader;
