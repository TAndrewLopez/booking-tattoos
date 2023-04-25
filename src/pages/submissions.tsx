import SubCard from "@/components/Submissions/SubCard";
import SubSidebar from "@/components/Submissions/SubSidebar";
import type { FilterCondition, Appointment } from "@/types";
import { api } from "@/utils/api";
import { type NextPage, type NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useMemo, useState } from "react";

const Submissions: NextPage = () => {
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

  return (
    <main className="relative top-20 flex gap-5 p-4">
      {/* SEARCH AND FILTER FEATURES */}
      <SubSidebar
        search={searchName}
        setSearch={setSearchName}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="flex w-full flex-wrap gap-5">
        {/* UNFILTERED APPOINTMENT DATA */}
        {!filters.length &&
          !searchName.length &&
          !searchNameSubmissions.length &&
          aptData?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}

        {/* FILTERED APPOINTMENT DATA */}
        {!!filters.length &&
          !searchName.length &&
          !searchNameSubmissions.length &&
          filteredSubmissions?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}

        {/* SEARCHED SUBMISSIONS */}
        {!!searchNameSubmissions.length &&
          !filters.length &&
          searchNameSubmissions?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}

        {/* SEARCHED SUBMISSIONS WITH FILTERS */}
        {!!filters.length &&
          !!searchNameSubmissions.length &&
          filteredSearchNameSubmissions?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}
      </div>
    </main>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default Submissions;
