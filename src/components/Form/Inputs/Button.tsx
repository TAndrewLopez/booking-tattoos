import { type SyntheticEvent, type ReactNode } from "react";

interface FormButtonProps {
  label: string | ReactNode;
  onClick: (evt: SyntheticEvent) => void;
  disabled?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  label,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-md bg-emerald-200 px-3 py-2 text-emerald-900 hover:bg-emerald-900 hover:text-white disabled:bg-neutral-400 disabled:text-neutral-50"
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default FormButton;
