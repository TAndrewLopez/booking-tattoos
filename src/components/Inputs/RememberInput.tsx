import React from "react";
import { FaCheck } from "react-icons/fa";

interface RememberInputProps {
  label: string;
  remember: boolean;
  onClick: () => void;
}

const RememberInput = ({ label, remember, onClick }: RememberInputProps) => {
  return (
    <div className="flex items-center px-6 text-white">
      <input
        type="checkbox"
        id="remember"
        className="appearance-none"
        checked={remember}
        readOnly
      />
      <div className="flex items-center gap-3" onClick={onClick}>
        <span
          className={`flex h-4 w-4 items-center justify-center rounded border-2 text-white ${
            remember ? "bg-sky-400" : ""
          }`}
        >
          {remember && <FaCheck size={18} />}
        </span>

        <label htmlFor="remember" className="text-sm font-medium">
          {label}
        </label>
      </div>
    </div>
  );
};

export default RememberInput;
