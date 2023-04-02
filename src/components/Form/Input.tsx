interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  type,
  value,
  disabled,
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full rounded-md border-2 border-neutral-200 bg-neutral-200 p-4 text-lg text-neutral-700 outline-none transition focus:border-2 focus:border-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70"
    />
  );
};

export default Input;
