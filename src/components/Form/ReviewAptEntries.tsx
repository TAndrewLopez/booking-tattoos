interface ReviewAptEntriesProps {
  values: string[];
}

const ReviewAptEntries: React.FC<ReviewAptEntriesProps> = ({ values }) => {
  return (
    <div>
      <div>
        <p>Please review your information before submitting.</p>
      </div>
      <ul>
        {values.map((item, i) => (
          <li key={item + String(i)}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewAptEntries;
