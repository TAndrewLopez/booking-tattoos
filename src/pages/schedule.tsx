import { type NextPageContext, type NextPage } from "next";
import { getSession } from "next-auth/react";

const Schedule: NextPage = () => {
  return <main>Schedule</main>;
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

export default Schedule;
