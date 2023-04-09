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

  const [filter, setFilter] = useState("");

  const filteredSubmissions = useMemo(() => {
    const submissions: AppointmentData[] = [];
    if (filter === "accepted") {
      aptData?.forEach((item) => {
        if (item.accepted === true) submissions.push(item);
      });
    }
    if (filter === "rejected") {
      aptData?.forEach((item) => {
        if (item.accepted === false) submissions.push(item);
      });
    }
    if (filter === "colored") {
      aptData?.forEach((item) => {
        if (item.color === "Colored") submissions.push(item);
      });
    }
    if (filter === "black & grey") {
      aptData?.forEach((item) => {
        if (item.color === "Black & Grey") submissions.push(item);
      });
    }
    return submissions.reduce((acc: AppointmentData[], el: AppointmentData) => {
      if (!acc.includes(el)) {
        acc.push(el);
      }
      return acc;
    }, []);
  }, [filter, aptData]);

  return (
    <main className="flex flex-wrap gap-4 p-4">
      {/* SEARCH AND FILTER FEATURES */}
      <SubHeader filter={filter} setFilter={setFilter} />

      {/* UNFILTERED APPOINTMENT DATA */}
      {!filter.length &&
        aptData?.map((data) => <SubCard data={data} key={data.id} />)}

      {/* FILTERED APPOINTMENT DATA */}
      {!!filter.length &&
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
