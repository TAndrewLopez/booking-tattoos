interface InputProps {
  id: string;
  label: string;
  error?: boolean;
  type?: string;
  value?: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  error,
  type,
  value,
  disabled,
  onChange,
}) => {
  return (
    <div className="relative">
      <input
        id={id}
        placeholder=" "
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`peer block w-full appearance-none rounded-md border-2 border-neutral-200 bg-neutral-200 px-6 pb-1 pt-6 text-base text-neutral-700 focus:outline-none focus:ring-0 disabled:border-neutral-700 disabled:bg-neutral-700 disabled:text-neutral-100
        ${error ? "border-red-600" : ""}`}
      />
      <label
        htmlFor={id}
        className="absolute left-6 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-base text-zinc-600 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-disabled:text-white"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
