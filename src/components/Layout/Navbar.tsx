import Link from "next/link";
import AuthButtons from "../Auth/AuthButtons";
import { useSession } from "next-auth/react";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { useCallback, useState } from "react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const [showMobileNav, setShowMobileNav] = useState(false);

  const handleMobileNav = useCallback(() => {
    setShowMobileNav(!showMobileNav);
  }, [showMobileNav]);

  return (
    <div className="flex items-center justify-between p-4">
      <div>Raquel Tattoos</div>
      <div className="hidden items-center gap-4 md:flex">
        <Link href="/">Home</Link>
        <Link href="/tattooRequest">Tattoo Request</Link>
        {sessionData?.user && (
          <>
            <Link href="/submissions">Submissions</Link>
            <Link href="/schedule">Schedule</Link>
            <Link href="/billing">Billing</Link>
            <Link href="/messages">Messages</Link>
          </>
        )}
        <AuthButtons />
      </div>

      <RxHamburgerMenu
        onClick={() => setShowMobileNav(!showMobileNav)}
        className="md:hidden"
        size={24}
      />

      {
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
            <Link onClick={handleMobileNav} href="/">
              Home
            </Link>
            <Link onClick={handleMobileNav} href="/tattooRequest">
              Tattoo Request
            </Link>
            <Link onClick={handleMobileNav} href="/submissions">
              Submissions
            </Link>
            <Link onClick={handleMobileNav} href="/schedule">
              Schedule
            </Link>
            <Link onClick={handleMobileNav} href="/billing">
              Billing
            </Link>
            <Link onClick={handleMobileNav} href="/messages">
              Messages
            </Link>
            <AuthButtons />
          </div>
        </div>
      }
    </div>
  );
};

export default Navbar;
