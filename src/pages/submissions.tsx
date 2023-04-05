import SubCard from "@/components/Submissions/SubCard";
import { api } from "@/utils/api";
import { type NextPage, type NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

const Submissions: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: aptData } = api.appointment.getAll.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <main className="flex flex-wrap gap-4 p-4">
      {/* SEARCH AND FILTER FEATURES */}
      {aptData?.map((data) => (
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
