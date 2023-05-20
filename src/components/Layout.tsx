import Head from "next/head";
import { useMemo, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import AuthForm from "./Modal/AuthModal";
import BugModal from "./Modal/BugModal";
import RequestModal from "./Modal/RequestModal";
import ReportBugIcon from "./ReportBugIcon";
import MobileNav from "./Modal/MobileNavModal";
import NavContainer from "./NavContainer";
import EventModal from "./Modal/EventModal";
import { useRouter } from "next/router";
import useLayout from "@/hooks/global/useLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { modalName } = useLayout();

  const currentPath = useMemo(() => {
    switch (router.pathname) {
      case "/dashboard":
        return "white";
      case "/submissions":
        return "white";
      default:
        return "default";
    }
  }, [router.pathname]);

  return (
    <>
      <Head>
        <title>Raquel&apos;s Tattoos</title>
        <meta name="description" content="Raquel Tattoos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavContainer
        showLogo
        style={currentPath}
        zIndex={
          modalName === "mobile" ||
          modalName === "request" ||
          modalName === "bug"
            ? "z-20"
            : "z-50"
        }
      />
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
