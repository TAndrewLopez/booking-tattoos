interface FilterItemProps {
  id: string;
  label: string;
  checkedForTrue: boolean;
  toggleTrueValue: () => void;
  checkedForFalse: boolean;
  toggleFalseValue: () => void;
}

export default function FilterItem({
  id,
  label,
  checkedForTrue,
  toggleTrueValue,
  checkedForFalse,
  toggleFalseValue,
}: FilterItemProps) {
  return (
    <div className="grid w-full grid-cols-4">
      <div className="col-span-3">
        <label className="text-sm" htmlFor={id}>
          {label}:
        </label>
      </div>
      <div className="col-span-1 flex items-center justify-end gap-4">
        <input
          id={id}
          type="checkbox"
          className="h-4 w-4"
          checked={checkedForTrue}
          onChange={toggleTrueValue}
        />
        <input
          id={id}
          type="checkbox"
          className="h-4 w-4"
          checked={checkedForFalse}
          onChange={toggleFalseValue}
        />
      </div>
    </div>
  );
}
