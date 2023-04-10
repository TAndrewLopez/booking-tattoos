import { type NextPage, type NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Messages: NextPage = () => {
  return <main className="p-4">Messages</main>;
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

export default Messages;
