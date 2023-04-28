import SubCard from "@/components/Submissions/SubCard";
import SubSidebar from "@/components/Submissions/SubSidebar";
import useAppointmentData from "@/hooks/useAppointmentData";
import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

const Submissions: NextPage = () => {
  const { data: sessionData } = useSession();

  const {
    aptData,
    filteredSearchNameSubmissions,
    filteredSubmissions,
    filters,
    searchName,
    searchNameSubmissions,
    setFilters,
    setSearchName,
  } = useAppointmentData();

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
