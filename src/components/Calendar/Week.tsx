import React, { useState } from "react";
import Day from "./Day";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import moment from "moment";

interface WeekProps {
  month: moment.Moment[][];
}

const Week: React.FC<WeekProps> = ({ month }) => {
  const [weekIndex, setWeekIndex] = useState(Math.floor(moment().week() / 4));

  return (
    <div className="relative grid flex-1 grid-cols-7">
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2">
        <div className="flex w-full justify-between">
          <BiChevronLeft
            className="cursor-pointer"
            size={30}
            onClick={() =>
              setWeekIndex((prev) => {
                if (prev - 1 > 0) {
                  return prev - 1;
                } else {
                  return 0;
                }
              })
            }
          />
          <BiChevronRight
            className="cursor-pointer"
            size={30}
            onClick={() =>
              setWeekIndex((prev) => {
                if (prev + 1 > 4) {
                  return 4;
                } else {
                  return prev + 1;
                }
              })
            }
          />
        </div>
      </div>
      {month[weekIndex]?.map((day, i) => (
        <React.Fragment key={i}>
          <Day day={day} rowIndex={weekIndex} key={i} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Week;
