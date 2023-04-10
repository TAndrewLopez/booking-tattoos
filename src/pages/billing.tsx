import { type NextPage, type NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Billing: NextPage = () => {
  return <main className="p-4">Billing</main>;
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
export default Billing;
