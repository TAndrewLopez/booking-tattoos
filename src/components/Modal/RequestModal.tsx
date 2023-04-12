import useTattooModal from "@/hooks/useTattooModal";
import MultiForm from "../Form/MultiForm";
import Modal from "./Modal";

const RequestModal = () => {
  const { isOpen, closeModal } = useTattooModal();

  return (
    <Modal
      isOpen={isOpen}
      title="Request Tattoo"
      body={<MultiForm />}
      onClose={closeModal}
    />
  );
};

export default RequestModal;
