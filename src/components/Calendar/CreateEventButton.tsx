import useEventModal from "@/hooks/global/useEventModal";
import { BsPlus } from "react-icons/bs";

interface CreateEventButtonProps {
  lightText?: boolean;
}

const CreateEventButton = ({ lightText }: CreateEventButtonProps) => {
  const { openModal } = useEventModal();
  return (
    <button
      onClick={openModal}
      className={`group peer mx-auto flex items-center justify-center rounded-full border-2 p-2 shadow-md duration-300 ease-in-out hover:shadow-2xl
      ${
        lightText
          ? "border-white/70 text-white/70 hover:bg-white/70 hover:text-blue-500"
          : "border-neutral-700 text-neutral-700 hover:bg-neutral-700 hover:text-white/70"
      }
      `}
    >
      <BsPlus
        className={`duration-300 ease-in-out
        ${
          lightText
            ? "text-white/70 group-hover:text-blue-500"
            : "text-neutral-700 group-hover:text-white/70"
        }`}
        size={28}
      />
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
};

export default CreateEventButton;
