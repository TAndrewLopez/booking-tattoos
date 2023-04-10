import Calendar from "@/components/Calendar/Calendar";
import { getMonth } from "@/utils/calendar";
import { type NextPage, type NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Schedule: NextPage = () => {
  console.table(getMonth(11));
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
