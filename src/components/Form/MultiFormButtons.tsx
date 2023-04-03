import useAppointmentStore from "@/state/appointmentStore";
import React, { type SetStateAction, type Dispatch, useMemo } from "react";
import FormButton from "./Inputs/FormButton";

interface MultiFormButtonsProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleSubmit: () => void;
}

const MultiFormButtons: React.FC<MultiFormButtonsProps> = ({
  page,
  setPage,
  handleSubmit,
}) => {
  const {
    name,
    preferredPronouns,
    email,
    phoneNumber,
    description,
    size,
    placement,
    color,
  } = useAppointmentStore();

  const contactFormCompleted = useMemo(() => {
    if (!name || !preferredPronouns || !email || !phoneNumber) return true;
    return false;
  }, [name, preferredPronouns, email, phoneNumber]);

  const tattooFormCompleted = useMemo(() => {
    if (!description || !size || !placement || !color) return true;
    return false;
  }, [description, size, placement, , color]);

  return (
    <>
      {/* BACK BUTTON */}
      {page > 0 && (
        <button
          onClick={() => setPage((prev: number) => prev - 1)}
          className="rounded-md bg-red-200 px-3 py-2 text-red-900 hover:bg-red-900 hover:text-white"
        >
          Back
        </button>
      )}
      {/* NEXT BUTTONS */}
      {page === 0 && (
        <FormButton
          label="Next"
          onClick={() => setPage((prev: number) => prev + 1)}
          disabled={contactFormCompleted}
        />
      )}
      {page === 1 && (
        <FormButton
          label="Next"
          onClick={() => setPage((prev: number) => prev + 1)}
          disabled={tattooFormCompleted}
        />
      )}
      {page === 2 && (
        <FormButton
          label="Review"
          onClick={() =>
            console.log({
              name,
              preferredPronouns,
              email,
              phoneNumber,
              description,
              placement,
              size,
              color,
            })
          }
          disabled={tattooFormCompleted}
        />
      )}
    </>
  );
};

export default MultiFormButtons;
