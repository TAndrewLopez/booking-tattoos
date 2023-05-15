import useLayout from "@/hooks/global/useLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import AuthButtons from "../Auth/AuthButtons";
import ModalLeftSlider from "../Modal/ModalLeftSlider";

const MobileNav: React.FC = () => {
  const { data: session } = useSession();
  const { setModalName } = useLayout();
  const { pathname } = useRouter();

  return (
    <ModalLeftSlider containerName="mobile">
      <div className="item-center flex h-full w-full flex-col justify-center bg-neutral-100">
        <div className="absolute top-0 flex w-full justify-between p-4">
          <p className="font-domine text-2xl">Raquel Cude</p>
          <AiOutlineClose onClick={() => setModalName("")} size={24} />
        </div>
        <nav className="flex flex-col items-center gap-4">
          <Link
            href="/"
            className={`${pathname === "/" ? "border-b-2 border-sky-500" : ""}`}
            onClick={() => (pathname === "/" ? setModalName("") : null)}
          >
            Home
          </Link>

          {session?.user ? (
            <>
              <Link
                href="/submissions"
                className={`${
                  pathname === "/submissions" ? "border-b-2 border-sky-500" : ""
                }`}
                onClick={() =>
                  pathname === "/submissions" ? setModalName("") : null
                }
              >
                Submissions
              </Link>
              <Link
                href="/calendar"
                className={`${
                  pathname === "/calendar" ? "border-b-2 border-sky-500" : ""
                }`}
                onClick={() =>
                  pathname === "/calendar" ? setModalName("") : null
                }
              >
                Calendar
              </Link>

              <AuthButtons session={session} />
            </>
          ) : (
            <Link href="/" onClick={() => setModalName("auth")}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </ModalLeftSlider>
  );
};

export default MobileNav;
