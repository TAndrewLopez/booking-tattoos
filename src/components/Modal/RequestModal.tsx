import { useCallback, useState } from "react";
import Modal from "./Modal";
import useTattooModal from "@/hooks/useTattooModal";
import MultiForm from "../Form/MultiForm";

const RequestModal = () => {
  const { isOpen, closeModal } = useTattooModal();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    return null;
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      title="Request Tattoo"
      body={<MultiForm />}
      actionLabeL="Send Request"
      disabled={isLoading}
      onSubmit={handleSubmit}
      onClose={closeModal}
    />
  );
};

export default RequestModal;
