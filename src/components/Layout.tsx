import Head from "next/head";
import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AuthForm from "./Modal/AuthModal";
import BugModal from "./Modal/BugModal";
import RequestModal from "./Modal/RequestModal";
import ReportBugIcon from "./ReportBugIcon";
import MobileNav from "./MobileNavContainer";
import NavContainer from "./NavContainer";
import EventModal from "./Modal/EventModal";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Raquel&apos;s Tattoos</title>
        <meta name="description" content="Raquel Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavContainer />
      <MobileNav />
      <Toaster />

      {children}

      <AuthForm />
      <RequestModal />
      <BugModal />
      <EventModal />
      <ReportBugIcon />
    </>
  );
};

export default Layout;
