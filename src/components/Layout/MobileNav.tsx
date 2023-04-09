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
      <div className="absolute top-0 flex w-full justify-between p-4">
        <p className="font-domine text-2xl">Raquel Cude</p>
        <AiOutlineClose
          onClick={() => setShowMobileNav(!showMobileNav)}
          size={24}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Link
          onClick={handleMobileNav}
          href="/"
          className={`${pathname === "/" ? "border-b-2 border-sky-500" : ""}`}
        >
          Home
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
