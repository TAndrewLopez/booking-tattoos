import { type NextPage, type NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Billing: NextPage = () => {
  return (
    <main className="relative top-20 p-4">
      <p className="font-bold">Billing</p>
      <p>Paypal API</p>
      <p>Get deposit information and store data on appointment data modeal</p>
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
export default Billing;
