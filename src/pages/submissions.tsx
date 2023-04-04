import { api } from "@/utils/api";
import { type NextPage, type NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";

const Submissions: NextPage = () => {
  const { data: sessionData } = useSession();
  const { data: aptData, refetch: refetchAptDat } =
    api.appointment.getAll.useQuery(undefined, {
      enabled: sessionData?.user !== undefined,
    });

  return (
    <>
      <Head>
        <title>Review Submissions</title>
        <meta name="description" content="Booking Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ul>
          {aptData?.map((item) => (
            <li key={item.id}>
              <p>{item.name}</p>
              <p>{item.email}</p>
              <p>{item.description}</p>
              <p>{item.placement}</p>
              <hr />
            </li>
          ))}
        </ul>
      </main>
    </>
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
