import React from "react";
import Day from "./Day";

interface MonthProps {
  month: moment.Moment[][];
}

const Month: React.FC<MonthProps> = ({ month }) => {
  return (
    <div className="grid flex-1 grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} rowIndex={i} key={idx} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Month;
