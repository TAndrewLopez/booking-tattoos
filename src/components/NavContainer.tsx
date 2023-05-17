import ModalTrigger from "@/components/ModalTrigger";
import useLayout from "@/hooks/global/useLayout";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";

const Navbar = () => {
  const { data: sessionData } = useSession();
  const { modalName, setModalName, isMobile, yScrollPosition } = useLayout();
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav
      className={`fixed top-0 flex w-full items-center justify-between p-4
      ${yScrollPosition > 30 ? "shadow-lg" : ""}
      ${pathname === "/" ? "text-white" : "bg-white"}
      ${
        modalName === "mobile" || modalName === "request" || modalName === "bug"
          ? "z-20"
          : "z-50 "
      }
      `}
    >
      <div className={`${pathname === "/" ? "text-white" : ""}`}>
        <Link className="font-domine text-2xl" href="/">
          Raquel Cude
        </Link>
      </div>

      {isMobile ? (
        <RxHamburgerMenu
          color={`${pathname === "/" ? "white" : ""}`}
          onClick={() => setModalName("mobile")}
          size={24}
        />
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => setModalName("")}
            className={
              pathname === "/" && !modalName ? "border-b-2 border-sky-500" : ""
            }
          >
            Home
          </Link>
          {sessionData?.user ? (
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
              {sessionData.user.role === "dev" && (
                <Link
                  href="/dashboard"
                  className={`
              ${pathname === "/dashboard" ? "border-b-2 border-sky-500" : ""}`}
                >
                  Dashboard
                </Link>
              )}
              <ModalTrigger label="Logout" onClick={() => void signOut()} />
            </>
          ) : (
            <>
              <ModalTrigger
                label="login"
                modal="auth"
                onClick={() => setModalName("auth")}
              />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
