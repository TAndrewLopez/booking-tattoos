import Calendar from "@/components/Schedule/Calendar";
import { type NextPageContext, type NextPage } from "next";
import { getSession } from "next-auth/react";

const Schedule: NextPage = () => {
  return (
    <main className="p-4">
      <Calendar />
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

export default Schedule;
