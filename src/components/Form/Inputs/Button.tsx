import { type SyntheticEvent, type ReactNode } from "react";

interface ButtonProps {
  type: "submit" | "error" | "details";
  label: string | ReactNode;
  onClick: (evt: SyntheticEvent) => void;
  disabled?: boolean;
  fullSize?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  onClick,
  disabled,
  fullSize,
}) => {
  return (
    <button
      onClick={onClick}
      className={`
      rounded-md px-3 py-2 hover:text-white
      disabled:cursor-not-allowed disabled:bg-neutral-400 disabled:text-neutral-50
      ${
        type === "submit"
          ? "bg-emerald-200 text-emerald-900 hover:bg-emerald-900"
          : ""
      }
      ${type === "error" ? "bg-red-200 text-red-900 hover:bg-red-900" : ""}
      ${type === "details" ? "bg-sky-200 text-sky-900 hover:bg-sky-900" : ""}
      ${fullSize ? "w-full" : ""}
      `}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
