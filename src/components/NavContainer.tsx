import ModalTrigger from "@/components/ModalTrigger";
import useLayout from "@/hooks/global/useLayout";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { RxHamburgerMenu } from "react-icons/rx";

interface NavbarProps {
  showLogo?: boolean;
  style: "glass" | "white" | "default";
  zIndex?: string;
}

const Navbar = ({ showLogo, style = "default", zIndex }: NavbarProps) => {
  const { data: sessionData } = useSession();
  const role = sessionData?.user.role;
  const { modalName, setModalName, isMobile, yScrollPosition } = useLayout();
  const router = useRouter();
  const { pathname } = router;

  return (
    <nav
      className={`fixed top-0 flex w-full items-center p-4  
      ${
        style === "glass"
          ? "bg-white bg-opacity-60 backdrop-blur-lg backdrop-filter"
          : ""
      }
      ${style === "white" ? "bg-white text-neutral-700" : ""}
      ${style === "default" ? "text-white" : ""}
      ${yScrollPosition > 30 ? "shadow-lg" : ""}
      ${zIndex ? zIndex : ""}
      ${showLogo ? "justify-between" : "justify-end"}
      `}
    >
      {showLogo && (
        <Link className="font-domine text-2xl" href="/">
          Raquel Cude
        </Link>
      )}

      {isMobile ? (
        <RxHamburgerMenu onClick={() => setModalName("mobile")} size={24} />
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
          {role === "dev" && (
            <Link
              href="/dashboard"
              className={
                pathname === "/dashboard" ? "border-b-2 border-sky-500" : ""
              }
            >
              Dashboard
            </Link>
          )}

          {role === "admin" && (
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
            </>
          )}

          {role ? (
            <ModalTrigger label="Logout" onClick={() => void signOut()} />
          ) : (
            <ModalTrigger
              label="login"
              modal="auth"
              onClick={() => setModalName("auth")}
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
