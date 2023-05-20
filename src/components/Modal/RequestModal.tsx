import { AiOutlineClose } from "react-icons/ai";
import MultiForm from "./needsUpdating/MultiForm";
import useLayout from "@/hooks/global/useLayout";
import FromRightModal from "../AnimatedContainers/FromRightModal";

const RequestModal = () => {
  const { setModalName } = useLayout();
  return (
    <FromRightModal containerName="request">
      <div className="fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-opacity-60 backdrop-blur-sm backdrop-filter">
        <div className="relative h-full w-full shadow-2xl shadow-sky-200 md:h-auto md:w-3/6 md:max-w-3xl">
          <div className="relative flex h-full w-full flex-col overflow-y-auto rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto">
            <div className="flex items-center justify-between rounded-t p-5">
              <h3 className="text-3xl font-semibold text-neutral-700">
                Request Tattoo
              </h3>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-200"
                onClick={() => setModalName("")}
              >
                <AiOutlineClose size={24} />
              </button>
            </div>
            <div className="relative flex-auto p-5">
              <MultiForm />
            </div>
          </div>
        </div>
      </div>
    </FromRightModal>
  );
};

export default RequestModal;
