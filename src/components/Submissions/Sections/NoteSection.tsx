import TextArea from "@/components/Form/Inputs/TextArea";
import { type Appointment, type NoteInputs } from "@/types";
import moment from "moment";
import { FiTrash } from "react-icons/fi";

interface NoteSectionProps {
  editEnabled: boolean;
  userId: string;
  inputs: NoteInputs;
  data: Appointment;
  handleDelete: (noteId: string) => void;
}

const NoteSection: React.FC<NoteSectionProps> = ({
  editEnabled,
  userId,
  inputs: { notes },
  data,
  handleDelete,
}) => {
  return (
    <section className="space-y-2 p-3">
      {data.notes.map((note) => (
        <div
          className={`flex w-full rounded-md px-6 py-3
      ${editEnabled ? "bg-neutral-200" : "bg-neutral-700 text-white"}
      `}
          key={note.id}
        >
          <div className="flex grow items-center">
            <p>{note.text}</p>
          </div>
          <div className="grid grid-cols-2 text-xs">
            <div className="col-span-1">
              <p className="hidden font-semibold md:block">Created At:</p>
              <p className="hidden font-semibold md:block">Created By:</p>
            </div>
            <div className="col-span-1">
              <p className="hidden truncate md:block">
                {moment(note.createdAt).format("MMMM DD hh:ss A")}
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
        value={notes.value}
        onChange={(evt) => notes.set(evt.target.value)}
        disabled={!editEnabled}
      />
    </section>
  );
};

export default NoteSection;
