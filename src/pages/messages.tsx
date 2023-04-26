import Chat from "@/components/Messages/Chat";
import ChatSidebar from "@/components/Messages/ChatSidebar";
import { type NextPage, type NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Messages: NextPage = () => {
  return (
    <main className="h-screen bg-[#a7bcff] md:flex md:items-center md:justify-center">
      {/* CONTAINER */}
      <div className="relative top-16 flex h-[90%] w-full rounded-xl shadow-2xl md:top-0 md:h-4/5 md:w-2/3">
        <ChatSidebar />
        <Chat />
      </div>
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

export default Messages;
