import useCalendarStore from "@/hooks/useCalendarStore";
import useEventModal from "@/hooks/useEventModal";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { MdDragHandle, MdSchedule, MdSegment } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { useRouter } from "next/router";

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const { pathname } = useRouter();
  const { isOpen, closeModal } = useEventModal();
  const { daySelected } = useCalendarStore();

  // FORM STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");

  useEffect(() => {
    if (pathname !== "/calendar" && isOpen) closeModal();
  }, [pathname, closeModal, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 flex h-screen w-full items-center justify-center">
      <form className="w-[448px] rounded-lg bg-white shadow-2xl">
        <header className="flex items-center justify-between bg-gray-100 px-4 py-2">
          <MdDragHandle className="text-gray-400" size={24} />
          <button onClick={closeModal}>
            <AiOutlineClose className="text-gray-400" size={24} />
          </button>
        </header>
        <div className="m-3 grid grid-cols-1/5 items-end gap-y-7">
          <div></div>
          <input
            className="w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
            name="title"
            placeholder="Add title"
            type="text"
            required
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />
          <MdSchedule className="text-gray-400" size={24} />
          <p>{daySelected?.format("dddd, MMMM DD")}</p>
          <MdSegment className="text-gray-400" size={24} />
          <input
            className="w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
            name="description"
            placeholder="Add description"
            type="text"
            required
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          <FiBookmark className="text-gray-400" size={24} />
          <div className="flex gap-x-2">
            {labelClasses.map((labelClass, i) => (
              <span
                onClick={() => setSelectedLabel(labelClass)}
                className={`bg-${labelClass}-500 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full`}
                key={i}
              >
                {labelClass === selectedLabel && (
                  <AiOutlineCheck className="text-white" />
                )}
              </span>
            ))}
          </div>
        </div>
        <footer className="mt-5 flex justify-end border-t p-3">
          <button
            type="submit"
            className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
