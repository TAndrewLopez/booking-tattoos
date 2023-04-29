import useLoginModal from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import AuthButtons from "../Auth/AuthButtons";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const { data: sessionData } = useSession();
  // const { isOpen, showModal, hideModal } = useLoginModal();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleMobileNav = useCallback(() => {
    setShowMobileNav(!showMobileNav);
  }, [showMobileNav]);

  return (
    <div
      className={`fixed top-0 z-50 flex w-full items-center justify-between p-4 shadow-md
      ${pathname !== "/" ? "bg-white" : ""}`}
    >
      <div className={`${pathname === "/" ? "text-white" : ""}`}>
        <Link className="font-domine text-2xl" href="/">
          Raquel Cude
        </Link>
      </div>
      <nav
        className={`hidden items-center gap-4 md:flex
        ${pathname === "/" ? "text-white" : ""}
        `}
      >
        <Link
          href="/"
          className={`
          ${pathname === "/" ? "border-b-2 border-sky-500" : ""}`}
        >
          Home
        </Link>

        {/* {isOpen ? (
          <button onClick={hideModal}>Form</button>
        ) : (
          <button
            onClick={() => {
              if (pathname !== "/") {
                void router.push("/");
              }
              showModal();
            }}
          >
            Login
          </button>
        )} */}

        {sessionData?.user && (
          <>
            <Link
              href="/submissions"
              className={`
              ${
                pathname === "/submissions" ? "border-b-2 border-sky-500" : ""
              }`}
            >
              Submissions
            </Link>
            <Link
              href="/calendar"
              className={`
              ${pathname === "/calendar" ? "border-b-2 border-sky-500" : ""}`}
            >
              Calendar
            </Link>
            {/* <Link
              href="/billing"
              className={`
              ${pathname === "/billing" ? "border-b-2 border-sky-500" : ""}`}
            >
              Billing
            </Link>
            <Link
              href="/messages"
              className={`
              ${pathname === "/messages" ? "border-b-2 border-sky-500" : ""}`}
            >
              Messages
            </Link> */}

            {/* <button
              onClick={() => {
                if (pathname !== "/") {
                  void router.push("/");
                }
                showModal();
              }}
            >
              Login
            </button> */}

            {/* {isOpen ? (
              <button onClick={hideModal}>Form</button>
            ) : (
              <button
                onClick={() => {
                  if (pathname !== "/") {
                    void router.push("/");
                  }
                  showModal();
                }}
              >
                Login
              </button>
            )} */}
          </>
        )}
        <AuthButtons session={sessionData} />
      </nav>

      <RxHamburgerMenu
        onClick={() => setShowMobileNav(!showMobileNav)}
        className="md:hidden"
        color={`${pathname === "/" ? "white" : ""}`}
        size={24}
      />

      <MobileNav
        session={sessionData}
        pathname={pathname}
        handleMobileNav={handleMobileNav}
        setShowMobileNav={setShowMobileNav}
        showMobileNav={showMobileNav}
      />
    </div>
  );
};

export default Navbar;
