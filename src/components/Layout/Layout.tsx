import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Raquel&apos;s Tattoos</title>
        <meta name="description" content="Raquel Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
