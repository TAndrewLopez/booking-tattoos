import useAppointmentStore from "@/state/appointmentStore";
import React, { type SetStateAction, type Dispatch, useMemo } from "react";
import FormButton from "./Inputs/Button";
import { toast } from "react-hot-toast";
import {
  validateNumber,
  validateEmail,
  validateSize,
} from "./helper/validation";

interface MultiFormButtonsProps {
  inputError: (val: string) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleSubmit: () => void;
}

const MultiFormButtons: React.FC<MultiFormButtonsProps> = ({
  inputError,
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

      {/* PAGE 1 NEXT BUTTON */}
      {page === 0 && (
        <FormButton
          label="Next"
          onClick={() => {
            // VALIDATING INPUTS
            if (!validateEmail(email)) {
              inputError("Email");
              return toast.error("Invalid Email");
            }
            if (!validateNumber(phoneNumber)) {
              inputError("Number");
              return toast.error("Invalid Phone Number");
            }
            setPage((prev: number) => prev + 1);
          }}
          disabled={contactFormCompleted}
        />
      )}

      {/* PAGE 2 NEXT BUTTON */}
      {page === 1 && (
        <FormButton
          label="Next"
          onClick={() => {
            // VALIDATING INPUTS
            if (!validateSize(size)) {
              inputError("Size");
              return toast.error("Invalid Size");
            }
            setPage((prev: number) => prev + 1);
          }}
          disabled={tattooFormCompleted}
        />
      )}

      {/* REVIEW BEFORE SUBMIT BUTTON */}
      {page === 2 && (
        <FormButton
          label="Submit"
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
