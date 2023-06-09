import TextArea from "@/components/Inputs/TextArea";
import { type Appointment } from "@/types";
import moment from "moment";
import { type Dispatch, type SetStateAction } from "react";
import { FiTrash } from "react-icons/fi";
import SubSection from "./SubSection";

interface NoteSectionProps {
  editEnabled: boolean;
  userId: string;
  notes: string;
  setNotes: Dispatch<SetStateAction<string>>;
  data: Appointment;
  handleDelete: (noteId: string) => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({
  editEnabled,
  userId,
  notes,
  setNotes,
  data,
  handleDelete,
}) => {
  return (
    <SubSection>
      {data.notes.map((note) => (
        <div
          className={`flex w-full rounded-md px-6 py-3 ${
            editEnabled ? "bg-neutral-200" : "bg-neutral-700 text-white"
          }`}
          key={note.id}
        >
          <div className="flex grow items-center">
            <p className="pr-1">{note.text}</p>
          </div>
          <div className="grid grid-cols-2 items-center text-xs">
            <div className="col-span-1">
              <p className="hidden font-semibold md:block">Created:</p>
              <p className="hidden font-semibold md:block">Author:</p>
            </div>
            <div className="col-span-1">
              <p className="hidden truncate md:block">
                {moment(note.createdAt).format("MM/DD hh:ss A")}
              </p>
              <p className="hidden truncate md:block">{note.user?.name}</p>
            </div>
          </div>
          {userId === note.userId && editEnabled && (
            <button
              onClick={() => handleDelete(note.id)}
              disabled={!editEnabled}
              className="ml-4"
            >
              <FiTrash
                className={
                  editEnabled ? "text-neutral-700" : "text-neutral-400"
                }
                size={18}
              />
            </button>
          )}
        </div>
      ))}
      <TextArea
        id="Notes"
        label="Notes"
        value={notes}
        onChange={(evt) => setNotes(evt.target.value)}
        disabled={!editEnabled}
      />
    </SubSection>
  );
};

export default NoteSection;
