import moment from "moment";

const Calendar = () => {
  const weekdayShort = moment.weekdaysShort();
  const dateObject = moment();

  const firstDayOfMonth = () => {
    return moment(dateObject).startOf("month").format("d");
  };

  return (
    <table className="w-full">
      <thead className="bg-slate-500 text-sm text-white">
        <tr>
          {weekdayShort.map((day) => (
            <th className="py-2" key={day}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
    </table>
  );
};

export default Calendar;
