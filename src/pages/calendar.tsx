import Calendar from "@/components/Calendar/Calendar";
import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Schedule: NextPage = () => {
  return (
    <main className="relative top-20 h-[93%] p-1 md:p-4">
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
