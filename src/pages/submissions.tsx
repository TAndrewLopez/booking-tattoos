import SubCard from "@/components/Submissions/SubCard";
import SubHeader from "@/components/Submissions/SubHeader";
import { type AppointmentData } from "@/types";
import { api } from "@/utils/api";
import { type NextPage, type NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useMemo, useState } from "react";

const Submissions: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: aptData } = api.appointment.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  const [filters, setFilters] = useState<Array<string>>([]);

  /*
    TODO : I WANT MULTIPLE FILTERS TO RETURN ONLY ITEMS THAT MEET ALL REQUIREMENTS
    TODO : POSSIBLE SOLUTION, ONLY ALLOW ONE FILTER
  */
  const filteredSubmissions = useMemo(() => {
    const submissions: AppointmentData[] = [];
    if (filters.includes("accepted")) {
      aptData?.forEach((item) => {
        if (item.accepted === true) submissions.push(item);
      });
    }
    if (filters.includes("rejected")) {
      aptData?.forEach((item) => {
        if (item.accepted === false) submissions.push(item);
      });
    }
    if (filters.includes("colored")) {
      aptData?.forEach((item) => {
        if (item.color === "Colored") submissions.push(item);
      });
    }
    return submissions.reduce((acc: AppointmentData[], el: AppointmentData) => {
      if (!acc.includes(el)) {
        acc.push(el);
      }
      return acc;
    }, []);
  }, [filters, aptData]);

  return (
    <main className="flex flex-wrap gap-4 p-4">
      {/* SEARCH AND FILTER FEATURES */}
      <SubHeader filters={filters} setFilters={setFilters} />

      {/* UNFILTERED APPOINTMENT DATA */}
      {!filters.length &&
        aptData?.map((data) => <SubCard data={data} key={data.id} />)}

      {/* FILTERED APPOINTMENT DATA */}
      {filters.length &&
        filteredSubmissions?.map((data) => (
          <SubCard data={data} key={data.id} />
        ))}
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
