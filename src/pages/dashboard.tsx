import { getSession } from "next-auth/react";
import { type NextPageContext } from "next";
import { api } from "@/utils/api";
import React from "react";

const Dashboard = () => {
  const { data: userData } = api.user.getAllUsers.useQuery(undefined, {});
  const updateUser = api.user.updateRole.useMutation();
  return (
    <main className="relative top-20 p-4">
      {userData?.map((item) => (
        <div className="flex gap-5" key={item.id}>
          <p>{item.email}</p>
          <p>{item.role}</p>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              updateUser.mutate({
                id: item.id,
                role: "dev",
              });
            }}
          >
            Update
          </button>
        </div>
      ))}

      <p>{userData && userData.length} users total</p>
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

export default Dashboard;
