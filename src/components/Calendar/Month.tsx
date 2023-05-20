import React from "react";
import Day from "./Day";
import CalendarHeader from "./CalendarHeader";

interface MonthProps {
  lightText?: boolean;
  headerUtilityName: string;
  headerUtility?: () => void;
  showHeader?: boolean;
  month: moment.Moment[][];
}

const Month: React.FC<MonthProps> = ({
  lightText,
  headerUtilityName,
  headerUtility,
  showHeader,
  month,
}) => {
  return (
    <div className="my-auto mr-6 w-full rounded-lg bg-white bg-opacity-60 p-3 backdrop-blur-lg backdrop-filter md:p-6">
      {showHeader && (
        <CalendarHeader
          headerUtility={headerUtility}
          headerUtilityName={headerUtilityName}
          lightText={lightText}
        />
      )}
      <div className="grid flex-1 grid-cols-7 grid-rows-5 md:max-w-7xl">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day lightText={lightText} day={day} rowIndex={i} key={idx} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Month;
