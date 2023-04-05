interface ReviewAptEntriesProps {
  values: { label: string; value: string }[];
}

const ReviewAptEntries: React.FC<ReviewAptEntriesProps> = ({ values }) => {
  return (
    <div>
      <p className="mb-5">Please review your information before submitting.</p>

      <ul className="flex flex-col gap-2">
        {values.map(({ label, value }, i) => (
          <div
            className="flex gap-4 rounded bg-neutral-200 px-6 py-3 text-neutral-700"
            key={label + String(i)}
          >
            <label className="font-extrabold">{label}:</label>
            <li>{value}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ReviewAptEntries;
