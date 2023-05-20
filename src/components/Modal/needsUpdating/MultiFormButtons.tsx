import useFormStore from "@/hooks/global/useFormStore";
import React, {
  useMemo,
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { validateEmail, validateNumber } from "@/utils/validation";
import Button from "../../Inputs/Button";

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
  const { name, email, phoneNumber, description, size, placement, color } =
    useFormStore();

  const contactFormCompleted = useMemo(() => {
    if (!name || !email || !phoneNumber) return true;
    return false;
  }, [name, email, phoneNumber]);

  const tattooFormCompleted = useMemo(() => {
    if (!description || !size || !placement || !color) return true;
    return false;
  }, [description, size, placement, , color]);

  return (
    <>
      {/* PAGE 1 NEXT BUTTON */}
      {page === 0 && (
        <Button
          type="submit"
          label="Next"
          onClick={(evt) => {
            evt.preventDefault();
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
          onClick={(evt) => {
            evt.preventDefault();
            setPage((prev: number) => prev + 1);
          }}
          disabled={tattooFormCompleted}
        />
      )}

      {/* REVIEW BEFORE SUBMIT BUTTON */}
      {page === 2 && (
        <Button
          type="submit"
          label={isLoading ? <ClipLoader size={22} color="#fff" /> : "Submit"}
          onClick={handleSubmit}
          disabled={isLoading || tattooFormCompleted}
        />
      )}

      {/* BACK BUTTON */}
      {page > 0 && (
        <Button
          type="error"
          label="Back"
          onClick={() => setPage((prev: number) => prev - 1)}
        />
      )}
    </>
  );
};

export default MultiFormButtons;
