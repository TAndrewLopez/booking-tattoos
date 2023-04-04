import Link from "next/link";
import AuthButtons from "../Auth/AuthButtons";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: sessionData } = useSession();
  console.log(sessionData);

  return (
    <div className="flex items-center justify-between p-4">
      <div>Raquel Tattoos</div>
      <div className="hidden items-center gap-4 md:flex">
        <Link href="/">Home</Link>
        <Link href="/tattooRequest">Tattoo Request</Link>
        {sessionData?.user && (
          <>
            <Link href="/submissions">Submissions</Link>
            <Link href="/">Schedule</Link>
            <Link href="/">Billing</Link>
            <Link href="/">Messages</Link>
          </>
        )}
        <AuthButtons />
      </div>
    </div>
  );
};

export default Navbar;
