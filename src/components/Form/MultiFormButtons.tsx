import React, { type SetStateAction, type Dispatch } from "react";

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
  return (
    <>
      {page > 0 && (
        <button
          onClick={() =>
            setPage((prev: number) => {
              return prev - 1;
            })
          }
          className="rounded-md bg-emerald-200 px-3 py-2 text-emerald-900"
        >
          Back
        </button>
      )}

      <button
        onClick={() => {
          if (page < 2) setPage((prev: number) => prev + 1);
          if (page === 2) handleSubmit();
        }}
        className="rounded-md bg-emerald-200 px-3 py-2 text-emerald-900"
      >
        {page < 2 ? "Next" : "Submit"}
      </button>
    </>
  );
};

export default MultiFormButtons;
