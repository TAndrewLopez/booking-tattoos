import { type Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";

interface AuthButtonProps {
  session: Session | null;
}

// TODO UPDATE AUTH TO BE EMAIL CREDENTIALS INSTEAD OF GOOGLE LOGIN

const AuthButtons: React.FC<AuthButtonProps> = ({ session }) => {
  return (
    <>
      {session?.user ? (
        <button
          className="rounded-md bg-red-200 px-3 py-2 text-red-900 hover:bg-red-900 hover:text-white"
          onClick={() => void signOut()}
        >
          Sign Out
        </button>
      ) : (
        <button
          className="rounded-md bg-emerald-200 px-3 py-2 text-emerald-900 hover:bg-emerald-900 hover:text-white disabled:bg-neutral-400"
          onClick={() => void signIn("google")}
        >
          Sign In
        </button>
      )}
    </>
  );
};

export default AuthButtons;
