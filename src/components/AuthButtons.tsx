import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import Button from "./Inputs/Button";

interface AuthButtonProps {
  session: Session | null;
}

const AuthButton: React.FC<AuthButtonProps> = ({ session }) => {
  return (
    <>
      {session?.user && (
        <Button type="error" label="Sign Out" onClick={() => void signOut()} />
      )}
    </>
  );
};

export default AuthButton;

/*
    <button
          className="rounded-md bg-red-200 px-3 py-2 text-red-900 hover:bg-red-900 hover:text-white"
          onClick={() => void signOut()}
        >
          Sign Out
        </button>
*/
