import useAppointmentModal from "@/hooks/useAppointmentModal";
import { AiOutlineClose } from "react-icons/ai";
import { MdDragHandle } from "react-icons/md";
import TattooInputs from "./TattooInputs";

const AppointmentModal = () => {
  const { isOpen, closeModal } = useAppointmentModal();

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center">
      <form className="w-[488px] rounded-lg bg-white shadow-2xl">
        {/* HEADER */}
        <header className="relative flex items-center justify-between bg-gray-100 px-4 py-2">
          <MdDragHandle className="text-gray-500" size={24} />
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
            Request Tattoo
          </p>
          <button onClick={closeModal}>
            <AiOutlineClose className="text-gray-500" size={24} />
          </button>
        </header>
        {/* SUB HEADER */}

        {/* CONTENT */}
        <div className="m-3 flex flex-col items-center gap-y-4">
          {/* <ContactInputs /> */}
          <TattooInputs />
        </div>

        <footer className="mt-5 flex justify-end border-t p-3">
          <button
            type="submit"
            className="flex h-10 w-20 items-center justify-center rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-neutral-400"
          >
            Next
          </button>
        </footer>
      </form>
    </div>
  );
};

export default AppointmentModal;
