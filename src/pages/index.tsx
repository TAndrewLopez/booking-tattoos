import { type NextPage } from "next";
import Head from "next/head";
import MultiForm from "@/components/Form/MultiForm";
import { api } from "@/utils/api";

const newAppointment = {
  name: "Andrew Dobson",
  preferredPronouns: "he/him",
  email: "andrew@email.com",
  phoneNumber: "8088889671",
  description: "Dealers choice",
  size: "6",
  placement: "forearm",
  color: "colored",
};

const Home: NextPage = () => {
  const createAppointment = api.appointment.create.useMutation({});

  return (
    <>
      <Head>
        <title>Booking Tattoos</title>
        <meta name="description" content="Booking Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MultiForm />
        <button
          className="rounded-md bg-sky-200 px-2 py-2"
          onClick={() => createAppointment.mutate(newAppointment)}
        >
          Test Logic
        </button>
      </main>
    </>
  );
};

export default Home;
