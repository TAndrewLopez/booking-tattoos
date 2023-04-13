import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import RequestModal from "@/components/Modal/RequestModal";
import EventModal from "@/components/Modal/EventModal";
import AppointmentModal from "@/components/Modal/AppointmentModal";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Layout>
        <RequestModal />
        {/* <AppointmentModal /> */}
        <EventModal />
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
