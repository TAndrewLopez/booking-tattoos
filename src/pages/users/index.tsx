import Table from "@/components/Table/Table";
import { api } from "@/utils/api";
import { type NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const AllUsers = () => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { data: userData } = api.user.getAllUsers.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });

  return (
    <main className="relative top-20 p-4">
      <div className="mb-10 flex items-center gap-10">
        <button
          onClick={() => router.back()}
          className="rounded-md bg-slate-700 px-6 py-2 text-white hover:bg-slate-700/70"
        >
          Back
        </button>
        <p>ALL Users</p>
      </div>

      <Table
        pagePath="users"
        showHeader
        tableName="user"
        tableColumnNames={["name", "email", "role"]}
        tableData={userData}
      />
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
