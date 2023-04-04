import MultiForm from "@/components/Form/MultiForm";
import { type NextPage } from "next";
import Head from "next/head";

const TattooRequest: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tattoo Request</title>
        <meta name="description" content="Booking Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MultiForm />
      </main>
    </>
  );
};

export default TattooRequest;
