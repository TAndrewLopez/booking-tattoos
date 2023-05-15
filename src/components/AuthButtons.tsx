import { type Session } from "next-auth";
import { signOut } from "next-auth/react";

interface AuthButtonProps {
  session: Session | null;
}

const AuthButtons: React.FC<AuthButtonProps> = ({ session }) => {
  return (
    <>
      {session?.user && (
        <button
          className="rounded-md bg-red-200 px-3 py-2 text-red-900 hover:bg-red-900 hover:text-white"
          onClick={() => void signOut()}
        >
          Sign Out
        </button>
      )}
    </>
  );
};

export default AuthButtons;
