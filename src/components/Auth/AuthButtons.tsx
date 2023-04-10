import { signIn, signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const { data: sessionData } = useSession();
  // TODO UPDATE AUTH TO BE EMAIL CREDENTIALS INSTEAD OF GOOGLE LOGIN
  return (
    <>
      {sessionData?.user ? (
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
