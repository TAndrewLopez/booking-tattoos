import ContactInputs from "@/components/FormInputs/ContactInputs";
import TattooInputs from "@/components/FormInputs/TattooInputs";
import useAppointmentModal from "@/hooks/useAppointmentModal";
import useFormStore from "@/hooks/useFormStore";
import { api } from "@/utils/api";
import { formatPhoneNumber, stripPhoneNumber } from "@/utils/validation";
import { useCallback, useState, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import MultiFormButtons from "./MultiFormButtons";
import ReviewAptEntries from "./ReviewEntry";
import Sidebar from "./Sidebar";

const MultiForm = () => {
  const createAppointment = api.appointment.create.useMutation();
  const { closeModal } = useAppointmentModal();

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
  } = useFormStore();

  const handleSubmit = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      try {
        setIsLoading(true);
        createAppointment.mutate({
          name,
          preferredPronouns,
          email,
          phoneNumber: stripPhoneNumber(phoneNumber),
          description,
          size,
          placement,
          color,
        });
        resetStore();
        setPage(0);
        closeModal();
        toast.success("Form submitted successfully!");
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
        <form className="mt-4 flex h-full flex-col gap-4">
          {page === 0 && (
            <ContactInputs
              isLoading={isLoading}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
          {page === 1 && (
            <TattooInputs
              isLoading={isLoading}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
          {page === 2 && (
            <ReviewAptEntries
              values={[
                { label: "Name", value: name },
                { label: "Pronouns", value: preferredPronouns },
                { label: "Email", value: email },
                {
                  label: "Phone Number",
                  value: formatPhoneNumber(phoneNumber),
                },
                { label: "Description", value: description },
                { label: "Size", value: size },
                { label: "Placement", value: placement },
                { label: "Color", value: color },
              ]}
            />
          )}
          <div
            className={`flex w-full 
            ${page === 0 ? "justify-end " : "flex-row-reverse"} 
            ${page > 0 ? "justify-between" : ""}`}
          >
            <MultiFormButtons
              isLoading={isLoading}
              inputError={setInputError}
              handleSubmit={handleSubmit}
              page={page}
              setPage={setPage}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiForm;
