import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import AuthButtons from "../Auth/AuthButtons";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { pathname } = useRouter();
  const { data: sessionData } = useSession();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleMobileNav = useCallback(() => {
    setShowMobileNav(!showMobileNav);
  }, [showMobileNav]);

  return (
    <div className="relative z-50 flex items-center justify-between p-4 font-domine">
      <div className={`${pathname === "/" ? "text-white" : ""}`}>
        <Link className="text-2xl" href="/">
          Raquel Cude
        </Link>
      </div>
      <div
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
              href="/schedule"
              className={`
              ${pathname === "/schedule" ? "border-b-2 border-sky-500" : ""}`}
            >
              Schedule
            </Link>
            <Link
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
            </Link>
          </>
        )}
        <AuthButtons />
      </div>

      <RxHamburgerMenu
        onClick={() => setShowMobileNav(!showMobileNav)}
        className="md:hidden"
        color={`${pathname === "/" ? "white" : ""}`}
        size={24}
      />

      <MobileNav
        pathname={pathname}
        handleMobileNav={handleMobileNav}
        setShowMobileNav={setShowMobileNav}
        showMobileNav={showMobileNav}
      />
    </div>
  );
};

export default Navbar;
