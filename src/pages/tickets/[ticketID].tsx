import { type NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const SingleTicket = () => {
  const router = useRouter();
  const { ticketID } = router.query;

  return (
    <main className="relative top-20 p-4">
      <button
        onClick={() => router.back()}
        className="rounded-md bg-slate-700 px-6 py-2 text-white hover:bg-slate-700/70"
      >
        Back
      </button>
      {`Ticket ID: ${ticketID as string}`}
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

export default SingleTicket;
