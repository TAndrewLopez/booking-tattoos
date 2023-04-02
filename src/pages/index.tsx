import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import ContactForm from "@/components/Form/ContactForm";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  console.log(sessionData);

  return (
    <>
      <Head>
        <title>Booking Tattoos</title>
        <meta name="description" content="Booking Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ContactForm />
      </main>
    </>
  );
};

export default Home;
