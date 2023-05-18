import { type NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const AllUsers = () => {
  const router = useRouter();
  return (
    <main className="relative top-20 p-4">
      <p>ALL Users</p>
      <button
        onClick={() => router.back()}
        className="rounded-md bg-slate-700 px-6 py-2 text-white hover:bg-slate-700/70"
      >
        Back
      </button>
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

export default AllUsers;
