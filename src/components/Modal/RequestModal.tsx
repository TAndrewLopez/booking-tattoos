import useAppointmentModal from "@/hooks/useAppointmentModal";
import { AiOutlineClose } from "react-icons/ai";
import MultiForm from "../Form/MultiForm";

const Modal = () => {
  const { isOpen, closeModal } = useAppointmentModal();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-hidden bg-neutral-800 bg-opacity-70 outline-none focus:outline-none">
        <div className="relative mx-auto my-6 h-full w-full md:h-auto md:w-3/6 md:max-w-3xl">
          {/* CONTENT */}
          <div className="relative flex h-full w-full flex-col overflow-y-auto rounded-lg border-0 bg-[#e3d8e9] shadow-lg outline-none focus:outline-none md:h-auto">
            {/* HEADER */}
            <div className="flex items-center justify-between rounded-t p-5">
              <h3 className="text-3xl font-semibold text-neutral-700">
                Request Tattoo
              </h3>
              <button onClick={closeModal}>
                <AiOutlineClose size={24} />
              </button>
            </div>
            {/* BODY */}
            <div className="relative flex-auto p-5">
              <MultiForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
