import useAppointmentStore from "@/state/appointmentStore";
import React, {
  useMemo,
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Button from "./Inputs/Button";
import {
  validateEmail,
  validateNumber,
  validateSize,
} from "./helper/validation";

interface MultiFormButtonsProps {
  isLoading: boolean;
  inputError: (val: string) => void;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  handleSubmit: (evt: SyntheticEvent) => void;
}

const MultiFormButtons: React.FC<MultiFormButtonsProps> = ({
  isLoading,
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
        <Button
          type="error"
          label="Back"
          onClick={() => setPage((prev: number) => prev - 1)}
        />
      )}

      {/* PAGE 1 NEXT BUTTON */}
      {page === 0 && (
        <Button
          type="submit"
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
        <Button
          type="submit"
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
        <Button
          type="submit"
          label={isLoading ? <ClipLoader color="red" /> : "Submit"}
          onClick={handleSubmit}
          disabled={tattooFormCompleted}
        />
      )}
    </>
  );
};

export default MultiFormButtons;
