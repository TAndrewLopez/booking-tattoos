import type { FilterCondition, Appointment } from "@/types";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";

const useAdminUtility = () => {
  const { data: sessionData } = useSession();
  const { data: aptData } = api.appointment.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const [searchName, setSearchName] = useState("");
  const [filters, setFilters] = useState<Array<string>>([]);

  const searchNameSubmissions = useMemo(() => {
    if (!aptData || !searchName.length) return [];

    const searchEmailQuery = aptData.filter((apt) =>
      apt.email.toLowerCase().includes(searchName.toLocaleLowerCase())
    );
    const searchNameQuery = aptData.filter((apt) =>
      apt.name.toLowerCase().includes(searchName.toLowerCase())
    );

    const result = new Set([...searchEmailQuery, ...searchNameQuery]);
    return [...result];
  }, [searchName, aptData]);

  const filteredSubmissions: Appointment[] = useMemo(() => {
    if (!aptData) return [];

    const filterConditions: FilterCondition = {
      consult: (apt, value) =>
        (value === "t" && !!apt.requiresConsultation) ||
        (value === "f" && !apt.requiresConsultation),

      accepted: (apt, value) => apt.accepted === (value === "t"),
      deposit: (apt, value) => apt.depositPaid === (value === "t"),
      image: (apt, value) =>
        (value === "t" && !!apt.referenceImageURL) ||
        (value === "f" && apt.referenceImageURL === null),
    };

    return aptData.filter((apt) => {
      return filters.every((filter) => {
        const filterType = filter.split("-")[0];
        const filterValue = filter.split("-")[1];

        const condition = filterConditions[filterType as string] as (
          apt: Appointment,
          value: string
        ) => boolean;
        return condition(apt, filterValue as string);
      });
    });
  }, [aptData, filters]);

  const filteredSearchNameSubmissions = useMemo(() => {
    if (!filteredSubmissions.length || !searchName.length) return [];

    return filteredSubmissions?.filter((apt) =>
      apt.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [searchName, filteredSubmissions]);

  return {
    searchName,
    setSearchName,
    filters,
    setFilters,
    aptData,
    searchNameSubmissions,
    filteredSubmissions,
    filteredSearchNameSubmissions,
  };
};
export default useAdminUtility;
