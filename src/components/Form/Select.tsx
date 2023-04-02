interface SelectProps {
  label: string;
  options: string[];
  value: string;
  disabled: boolean;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  disabled,
  onChange,
}) => {
  return (
    <select
      onChange={onChange}
      value={value}
      disabled={disabled}
      className="w-full rounded-md border-2 border-neutral-200 bg-neutral-200 p-4 text-lg text-neutral-700 outline-none transition focus:border-2 focus:border-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70"
    >
      <option value={undefined}>{label}</option>
      {options.map((option, i) => (
        <option value={option} key={option + String(i)}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
