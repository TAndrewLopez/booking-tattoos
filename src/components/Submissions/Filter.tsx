import useLayout from "@/hooks/global/useLayout";
import { type Dispatch, type SetStateAction, useCallback } from "react";

interface SubFilterProps {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
}

const SubFilter: React.FC<SubFilterProps> = ({ filters, setFilters }) => {
  const { isMobile } = useLayout();

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
      <div className="grid w-full grid-cols-4">
        <div className="col-span-3">
          <label className="text-sm" htmlFor="appointment">
            Appointment Accepted:
          </label>
        </div>
        <div className="col-span-1 flex items-center justify-end gap-4">
          <input
            id="appointment"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("accepted-t")}
            onChange={() => toggleFilterOption("accepted-t")}
          />
          <input
            id="appointment"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("accepted-f")}
            onChange={() => toggleFilterOption("accepted-f")}
          />
        </div>
      </div>
      {/* REQUIRES CONSULTATION */}
      <div className="grid w-full grid-cols-4">
        <div className="col-span-3">
          <label className="text-sm" htmlFor="consultation">
            Requires Consultation:
          </label>
        </div>
        <div className="col-span-1 flex items-center justify-end gap-4">
          <input
            id="consultations"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("consult-t")}
            onChange={() => toggleFilterOption("consult-t")}
          />
          <input
            id="consultations"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("consult-f")}
            onChange={() => toggleFilterOption("consult-f")}
          />
        </div>
      </div>
      {/* DEPOSIT PAID */}
      <div className="grid w-full grid-cols-4">
        <div className="col-span-3">
          <label className="text-sm" htmlFor="deposit">
            Deposit Paid:
          </label>
        </div>
        <div className="col-span-1 flex items-center justify-end gap-4">
          <input
            id="deposit"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("deposit-t")}
            onChange={() => toggleFilterOption("deposit-t")}
          />
          <input
            id="deposit"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("deposit-f")}
            onChange={() => toggleFilterOption("deposit-f")}
          />
        </div>
      </div>
      {/* HAS REFERENCE IMAGES */}
      <div className="grid w-full grid-cols-4">
        <div className="col-span-3">
          <label className="text-sm" htmlFor="references">
            Ref. Image Available:
          </label>
        </div>
        <div className="col-span-1 flex items-center justify-end gap-4">
          <input
            id="references"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("image-t")}
            onChange={() => toggleFilterOption("image-t")}
          />
          <input
            id="references"
            type="checkbox"
            className="h-4 w-4"
            checked={filters.includes("image-f")}
            onChange={() => toggleFilterOption("image-f")}
          />
        </div>
      </div>
    </div>
  );
};

export default SubFilter;
