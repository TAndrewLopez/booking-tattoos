import useCalendarStore from "@/hooks/useCalendarStore";
import useEventModal from "@/hooks/useEventModal";
import { type SyntheticEvent, useCallback, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { MdDragHandle, MdSchedule, MdSegment } from "react-icons/md";
import { FiBookmark } from "react-icons/fi";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { api } from "@/utils/api";

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const { pathname } = useRouter();
  const { isOpen, closeModal } = useEventModal();
  const { daySelected } = useCalendarStore();
  const [isLoading, setIsLoading] = useState(false);

  const { refetch: refetchCalendarEvents } =
    api.calendarEvents.getAll.useQuery();

  const createEvent = api.calendarEvents.create.useMutation({
    onSuccess: () => void refetchCalendarEvents(),
  });

  // FORM STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");
  const [aptTime, setAptTime] = useState("");

  const handleSubmit = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);

        if (!title) return toast.error("Title is required.");
        if (!aptTime) return toast.error("Appointment time is required.");
        if (!description) return toast.error("Description is required.");
        if (!selectedLabel) return toast.error("Please select a label.");

        createEvent.mutate({
          title,
          date: new Date(
            new Date(`${daySelected.format("yyyy-MM-DD")} ${aptTime}:00`)
          ),
          description,
          label: selectedLabel,
        });

        setTitle("");
        setDescription("");
        setSelectedLabel("");
        closeModal();
        toast.success("Calendar event created successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    },
    [
      title,
      description,
      selectedLabel,
      daySelected,
      closeModal,
      aptTime,
      createEvent,
    ]
  );

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
        <div className="m-3 grid grid-cols-1/5 items-center gap-y-7">
          <div></div>

          {/* TITLE INPUT */}
          <input
            className="w-full border-0 border-b-2 border-gray-200 pb-2 pt-3 text-xl font-semibold text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
            name="title"
            placeholder="Add title"
            type="text"
            required
            value={title}
            onChange={(evt) => setTitle(evt.target.value)}
          />

          {/* TIME INPUT */}
          <MdSchedule className="text-gray-400" size={24} />
          <div className="flex items-center gap-5">
            <p>{daySelected?.format("dddd, MMMM DD")}</p>
            <input
              required
              className="pb-2 pt-3 text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
              type="time"
              onChange={(evt) => setAptTime(evt.target.value)}
            />
          </div>

          {/* DESCRIPTION INPUT */}
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

          {/* LABEL SELECTION */}
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
            onClick={(evt) => void handleSubmit(evt)}
            type="submit"
            disabled={isLoading}
            className="flex h-10 w-20 items-center justify-center rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-neutral-400"
          >
            {isLoading ? <ClipLoader color="#fff" size={20} /> : "Save"}
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
