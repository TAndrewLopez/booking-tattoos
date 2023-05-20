import { type Dispatch, type SetStateAction, useCallback } from "react";
import FilterItem from "./FilterItem";

interface FilterProps {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
}

const Filter: React.FC<FilterProps> = ({ filters, setFilters }) => {
  const toggleFilterOption = useCallback(
    (val: string) => {
      // IF VAL EXIST IN ARRAY, REMOVE VALUE
      if (filters.find((item) => item === val))
        return setFilters((prev) => prev.filter((item) => item !== val));

      // IF VARIANT OF VAL EXIST, TOGGLE VARIANT
      const [toggleValue] = filters.filter(
        (item) =>
          (item.split("-")[0] as string) === (val.split("-")[0] as string)
      );
      if (toggleValue)
        return setFilters((prev) =>
          prev.map((item) => {
            if (item === toggleValue) {
              return val;
            }
            return item;
          })
        );

      // IF VAL DOESN'T EXIST, ADD TO FILTER ARRAY
      setFilters((prev) => [...prev, val]);
    },
    [filters, setFilters]
  );

  return (
    <div className="hidden flex-wrap items-center gap-3 md:flex">
      <div className="grid w-full grid-cols-4">
        <div className="col-span-3">
          <h3 className="text-sm font-semibold">Filter Type</h3>
        </div>
        <div className="col-span-1 flex items-center justify-end gap-4 text-sm font-semibold">
          <p
            title="True"
            className="flex h-4 w-4 items-center justify-center truncate"
          >
            Y
          </p>
          <p
            title="False"
            className="flex h-4 w-4 items-center justify-center truncate"
          >
            N
          </p>
        </div>
      </div>

      {/* APPOINTMENT ACCEPTED */}
      <FilterItem
        id="appointment"
        label="Appointment Accepted"
        checkedForTrue={filters.includes("accepted-t")}
        toggleTrueValue={() => toggleFilterOption("accepted-t")}
        checkedForFalse={filters.includes("accepted-f")}
        toggleFalseValue={() => toggleFilterOption("accepted-f")}
      />

      {/* REQUIRES CONSULTATION */}
      <FilterItem
        id="consultation"
        label="Requires Consultation"
        checkedForTrue={filters.includes("consult-t")}
        toggleTrueValue={() => toggleFilterOption("consult-t")}
        checkedForFalse={filters.includes("consult-f")}
        toggleFalseValue={() => toggleFilterOption("consult-f")}
      />
      {/* DEPOSIT PAID */}
      <FilterItem
        id="deposit"
        label="Deposit Paid"
        checkedForTrue={filters.includes("deposit-t")}
        toggleTrueValue={() => toggleFilterOption("deposit-t")}
        checkedForFalse={filters.includes("deposit-f")}
        toggleFalseValue={() => toggleFilterOption("deposit-f")}
      />

      {/* HAS REFERENCE IMAGES */}
      <FilterItem
        id="reference-image"
        label="Ref. Image Available"
        checkedForTrue={filters.includes("image-t")}
        toggleTrueValue={() => toggleFilterOption("image-t")}
        checkedForFalse={filters.includes("image-f")}
        toggleFalseValue={() => toggleFilterOption("image-f")}
      />
    </div>
  );
};

export default Filter;
