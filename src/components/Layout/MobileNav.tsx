import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import AuthButtons from "../Auth/AuthButtons";

interface MobileNavProps {
  showMobileNav: boolean;
  setShowMobileNav: (val: boolean) => void;
  handleMobileNav: () => void;
  pathname: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  showMobileNav,
  setShowMobileNav,
  handleMobileNav,
  pathname,
}) => {
  const { data: sessionData } = useSession();
  return (
    <div
      className={`fixed right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-neutral-100 duration-300 ease-in
      ${showMobileNav ? "translate-x-0" : "translate-x-full"}`}
    >
      <AiOutlineClose
        onClick={() => setShowMobileNav(!showMobileNav)}
        className="absolute right-4 top-4"
        size={24}
      />
      <div className="flex flex-col items-center gap-4">
        <Link
          onClick={handleMobileNav}
          href="/"
          className={`${pathname === "/" ? "border-b-2 border-sky-500" : ""}`}
        >
          Home
        </Link>
        <Link
          onClick={handleMobileNav}
          href="/tattooRequest"
          className={`${
            pathname === "/tattooRequest" ? "border-b-2 border-sky-500" : ""
          }`}
        >
          Tattoo Request
        </Link>
        {sessionData?.user && (
          <>
            <Link
              onClick={handleMobileNav}
              href="/submissions"
              className={`${
                pathname === "/submissions" ? "border-b-2 border-sky-500" : ""
              }`}
            >
              Submissions
            </Link>
            <Link
              onClick={handleMobileNav}
              href="/schedule"
              className={`${
                pathname === "/schedule" ? "border-b-2 border-sky-500" : ""
              }`}
            >
              Schedule
            </Link>
            <Link
              onClick={handleMobileNav}
              href="/billing"
              className={`${
                pathname === "/billing" ? "border-b-2 border-sky-500" : ""
              }`}
            >
              Billing
            </Link>
            <Link
              onClick={handleMobileNav}
              href="/messages"
              className={`${
                pathname === "/messages" ? "border-b-2 border-sky-500" : ""
              }`}
            >
              Messages
            </Link>
          </>
        )}
        <AuthButtons />
      </div>
    </div>
  );
};

export default MobileNav;
