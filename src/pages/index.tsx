import { type NextPage } from "next";
import Head from "next/head";
import MultiForm from "@/components/Form/MultiForm";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Booking Tattoos</title>
        <meta name="description" content="Booking Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MultiForm />
      </main>
    </>
  );
};

export default Home;
