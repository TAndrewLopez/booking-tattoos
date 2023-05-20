import useLayout from "@/hooks/global/useLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";
import AuthButtons from "../AuthButtons";
import FromRightModal from "../AnimatedContainers/FromRightModal";

const MobileNavModal: React.FC = () => {
  const { data: session } = useSession();
  const { setModalName } = useLayout();
  const { pathname } = useRouter();

  return (
    <FromRightModal containerName="mobile">
      <div className="item-center flex h-full w-full flex-col justify-center bg-neutral-100">
        <div className="absolute top-0 flex w-full justify-between p-4">
          <p className="font-domine text-2xl">Raquel Cude</p>
          <AiOutlineClose onClick={() => setModalName("")} size={24} />
        </div>
        <nav className="relative flex flex-col items-center gap-4">
          <Link
            href="/"
            className={`${pathname === "/" ? "border-b-2 border-sky-500" : ""}`}
            onClick={() => setModalName("")}
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
                onClick={() => setModalName("")}
              >
                Submissions
              </Link>
              <Link
                href="/calendar"
                className={`${
                  pathname === "/calendar" ? "border-b-2 border-sky-500" : ""
                }`}
                onClick={() => setModalName("")}
              >
                Calendar
              </Link>

              <AuthButtons session={session} />

              {/* <div className="fixed bottom-4 w-full bg-red-200 p-6">footer</div> */}
            </>
          ) : (
            <Link href="/" onClick={() => setModalName("auth")}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </FromRightModal>
  );
};

export default MobileNavModal;
