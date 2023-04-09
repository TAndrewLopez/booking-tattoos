import { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  body,
  footer,
  disabled,
  onClose,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

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
                {title}
              </h3>
              <button onClick={handleClose}>
                <AiOutlineClose size={24} />
              </button>
            </div>
            {/* BODY */}
            <div className="relative flex-auto p-5">{body}</div>
            {/* FOOTER */}
            {footer && <div className="flex flex-col gap-2 p-5">{footer}</div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
