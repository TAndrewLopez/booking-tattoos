import { type Session } from "next-auth";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import AuthButtons from "../Auth/AuthButtons";

interface MobileNavProps {
  session: Session | null;
  showMobileNav: boolean;
  setShowMobileNav: (val: boolean) => void;
  handleMobileNav: () => void;
  pathname: string;
}

const MobileNav: React.FC<MobileNavProps> = ({
  session,
  showMobileNav,
  setShowMobileNav,
  handleMobileNav,
  pathname,
}) => {
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
      <nav className="flex flex-col items-center gap-4">
        <Link
          onClick={handleMobileNav}
          href="/"
          className={`${pathname === "/" ? "border-b-2 border-sky-500" : ""}`}
        >
          Home
        </Link>
        {session?.user && (
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
              href="/calendar"
              className={`${
                pathname === "/calendar" ? "border-b-2 border-sky-500" : ""
              }`}
            >
              Calendar
            </Link>
            {/* <Link
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
            </Link> */}
          </>
        )}
        <AuthButtons session={session} />
      </nav>
    </div>
  );
};

export default MobileNav;
