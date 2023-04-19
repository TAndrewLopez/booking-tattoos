import SubCard from "@/components/Submissions/SubCard";
import SubSidebar from "@/components/Submissions/SubSidebar";
import { type Appointment } from "@/types";
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

    const returnResults: Appointment[] = [];

    return [...searchEmailQuery, ...searchNameQuery].reduce((acc, el) => {
      if (!acc.includes(el)) {
        acc.push(el);
      }
      return acc;
    }, returnResults);
  }, [searchName, aptData]);

  // LOGIC FOR STRING FILTER
  // const filteredSubmissions: Appointment[] = useMemo(() => {
  //   const submissions: Appointment[] = [];
  //   if (filter === "consultations") {
  //     aptData?.forEach((item) => {
  //       if (item.requiresConsultation) submissions.push(item);
  //     });
  //   }
  //   if (filter === "accepted") {
  //     aptData?.forEach((item) => {
  //       if (item.accepted === true) submissions.push(item);
  //     });
  //   }
  //   if (filter === "rejected") {
  //     aptData?.forEach((item) => {
  //       if (item.accepted === false) submissions.push(item);
  //     });
  //   }
  //   return submissions.reduce((acc: Appointment[], el: Appointment) => {
  //     if (!acc.includes(el)) {
  //       acc.push(el);
  //     }
  //     return acc;
  //   }, []);
  // }, [filter, aptData]);

  const filteredSubmissions: Appointment[] = useMemo(() => {
    return [];
  }, []);

  const filteredSearchNameSubmissions = useMemo(() => {
    if (!filteredSubmissions.length || !searchName.length) return [];

    return filteredSubmissions?.filter((apt) =>
      apt.name.toLowerCase().includes(searchName.toLowerCase())
    );
  }, [searchName, filteredSubmissions]);

  return (
    <main className="flex gap-5 p-4">
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
