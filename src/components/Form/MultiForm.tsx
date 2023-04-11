import ContactForm from "@/components/Form/ContactForm";
import TattooForm from "@/components/Form/TattooForm";
import useAppointmentStore from "@/hooks/useAppointmentStore";
import { api } from "@/utils/api";
import { useCallback, useState, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import MultiFormButtons from "./MultiFormButtons";
import ReviewAptEntries from "./ReviewEntry";
import Sidebar from "./Sidebar";
import useTattooModal from "@/hooks/useTattooModal";

const MultiForm = () => {
  const createAppointment = api.appointment.create.useMutation();
  const { closeModal } = useTattooModal();

  // LOCAL STATE
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  // GLOBAL STATE
  const {
    name,
    preferredPronouns,
    email,
    phoneNumber,
    description,
    size,
    placement,
    color,
    resetStore,
  } = useAppointmentStore();

  const handleSubmit = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);
        createAppointment.mutate({
          name,
          preferredPronouns,
          email,
          phoneNumber,
          description,
          size,
          placement,
          color,
        });
        resetStore();
        setPage(0);
        closeModal();
        toast.success("Form submission successful!");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      name,
      preferredPronouns,
      email,
      phoneNumber,
      description,
      size,
      placement,
      color,
      createAppointment,
      resetStore,
      closeModal,
    ]
  );

  return (
    <div className="mx-5">
      <div>
        <Sidebar page={page} />
        <div className="md:col-span-3">
          {page === 0 && (
            <ContactForm
              isLoading={isLoading}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
          {page === 1 && (
            <TattooForm
              isLoading={isLoading}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
          {page === 2 && (
            <ReviewAptEntries
              values={[
                { label: "Name", value: name },
                { label: "Preferred Pronouns", value: preferredPronouns },
                { label: "Email", value: email },
                { label: "Phone Number", value: phoneNumber },
                { label: "Description", value: description },
                { label: "Size", value: size },
                { label: "Placement", value: placement },
                { label: "Color", value: color },
              ]}
            />
          )}
        </div>
      </div>
      <div
        className={`
          flex w-full p-3
          ${page === 0 ? "justify-end" : ""}
          ${page > 0 ? "justify-between" : ""}
        `}
      >
        <MultiFormButtons
          isLoading={isLoading}
          inputError={setInputError}
          handleSubmit={handleSubmit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default MultiForm;
