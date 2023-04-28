import useCalendarStore from "@/hooks/useCalendarStore";
import useEventModal from "@/hooks/useEventModal";
import { api } from "@/utils/api";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, type SyntheticEvent } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { FiBookmark, FiTrash } from "react-icons/fi";
import { MdDragHandle, MdSchedule, MdSegment } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

// TODO: FIX SENDING DATE TO DATEBASE WITH NEW INPUT

const EventModal = () => {
  const { data: sessionData } = useSession();
  const { refetch: refetchCalendarEvents } = api.calendarEvents.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
    }
  );
  const createEvent = api.calendarEvents.create.useMutation({
    onSuccess: () => void refetchCalendarEvents(),
  });
  const updateEvent = api.calendarEvents.update.useMutation({
    onSuccess: () => void refetchCalendarEvents(),
  });
  const deleteEvent = api.calendarEvents.delete.useMutation({
    onSuccess: () => void refetchCalendarEvents(),
  });

  const { pathname } = useRouter();
  const { isOpen, closeModal, selectedEvent } = useEventModal();
  const { daySelected } = useCalendarStore();
  const [isLoading, setIsLoading] = useState(false);

  // FORM STATES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelClasses[0]);
  const [aptTime, setAptTime] = useState("");

  // FORM FUNCTIONS
  const handleDelete = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);
        if (!selectedEvent) return;
        deleteEvent.mutate({ id: selectedEvent.id });
        closeModal();
        toast.success("Calendar event deleted successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [selectedEvent, deleteEvent, closeModal]
  );

  const handleSubmit = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);

        if (!title) return toast.error("Title is required.");
        if (!aptTime)
          return toast.error("Appointment date and time is required.");
        if (!description) return toast.error("Description is required.");
        if (!selectedLabel) return toast.error("Please select a label.");

        if (selectedEvent) {
          // UPDATE SELECTED EVENT
          updateEvent.mutate({
            id: selectedEvent.id,
            title,
            date: new Date(aptTime),
            description,
            label: selectedLabel,
          });
          toast.success("Calendar event updated successfully!");
        } else {
          // CREATE NEW EVENT
          createEvent.mutate({
            userId: sessionData?.user.id,
            title,
            date: new Date(aptTime),
            description,
            label: selectedLabel,
          });
          toast.success("Calendar event created successfully!");
        }

        setTitle("");
        setDescription("");
        setSelectedLabel("");
        closeModal();
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
      closeModal,
      aptTime,
      createEvent,
      selectedEvent,
      updateEvent,
      sessionData?.user.id,
    ]
  );

  // CLOSES MODAL IF OPEN WHEN SWITCHING PAGES
  useEffect(() => {
    if (pathname !== "/calendar" && isOpen) closeModal();
  }, [pathname, closeModal, isOpen]);

  // LOADS MODAL WITH EVENT DATA IF SELECTED OTHERWISE CLEARS STATES IF UNSELECTED
  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setSelectedLabel(
        labelClasses.find((label) => label === selectedEvent.label)
      );
      setAptTime(moment(selectedEvent.date).format("yy-MM-DDTHH:mm"));
      return;
    }
    setTitle("");
    setDescription("");
    setSelectedLabel("");
    setAptTime(moment(daySelected).format("yy-MM-DDTHH:mm"));
  }, [selectedEvent, daySelected]);

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center">
      <form className="w-[448px] rounded-lg bg-white shadow-2xl">
        {/* HEADER */}
        <header className="relative flex items-center justify-between bg-gray-100 px-4 py-2">
          <MdDragHandle className="text-gray-500" size={24} />
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
            {selectedEvent ? "Update Event" : "Create Event"}
          </p>
          <div className="flex items-center gap-3">
            {selectedEvent && (
              <button onClick={handleDelete}>
                <FiTrash className="text-gray-500" size={18} />
              </button>
            )}
            <button onClick={closeModal}>
              <AiOutlineClose className="text-gray-500" size={24} />
            </button>
          </div>
        </header>

        {/* CONTENT */}
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

          {/* DATE AND TIME INPUT */}
          <MdSchedule className="text-gray-400" size={24} />
          <div className="flex items-center gap-5">
            <input
              required
              className="flex w-full justify-between border-0 border-b-2 border-gray-200 pb-2 pt-3 text-gray-600 focus:border-blue-500 focus:outline-none focus:ring-0"
              type="datetime-local"
              value={aptTime}
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

        {/* FOOTER */}
        <footer className="mt-5 flex items-center justify-end border-t p-3">
          {selectedEvent?.User?.name && (
            <p className="grow text-xs text-neutral-500">
              <span className="font-semibold">Created By: </span>
              {selectedEvent.User.name}{" "}
              {moment(selectedEvent.createdAt).fromNow()}
            </p>
          )}
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
