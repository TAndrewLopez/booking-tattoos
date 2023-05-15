import useLoginModal from "@/hooks/useLoginModal";
import { validateEmail } from "@/utils/validation";
import { signIn } from "next-auth/react";
import { useCallback, type SyntheticEvent } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Input from "../FormInputs/Input";
import ModalLeftSlider from "./ModalLeftSlider";

const AuthForm = () => {
  const { email, password, setValue, inputError, setInputError } =
    useLoginModal();

  const handleSubmit = useCallback(
    (evt: SyntheticEvent) => {
      evt.preventDefault();
      if (inputError) setInputError("");
      if (!validateEmail(email)) {
        setInputError("email");
        return toast.error("Invalid Email");
      }
      if (!password) {
        setInputError("password");
        return toast.error("Invalid Password");
      }
      console.log("user login");
    },
    [email, password, inputError, setInputError]
  );

  return (
    <ModalLeftSlider containerName="auth">
      <div className="flex flex-col items-center text-center">
        <form className="flex w-[300px] flex-col gap-5">
          <h1 className="text-shade-1 bg-gradient-to-r from-white to-sky-500 bg-clip-text text-4xl font-extrabold text-transparent">
            Account Login
          </h1>
          <Input
            id="email"
            label="Email"
            type="text"
            error={inputError === "email"}
            disabled={false}
            value={email}
            onChange={({ target }) => {
              if (inputError) setInputError("");
              setValue("email", target.value);
            }}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            error={inputError === "password"}
            disabled={false}
            value={password}
            onChange={({ target }) => {
              if (inputError) setInputError("");
              setValue("password", target.value);
            }}
          />
          <button
            type="submit"
            className="rounded bg-gradient-to-b from-sky-400 to-sky-600 p-4 tracking-wider transition hover:bg-gradient-to-t hover:font-bold"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        <div className="relative top-12">
          <button
            onClick={() => void signIn("google")}
            className="flex items-center gap-2 rounded-md bg-neutral-100 px-6 py-2 text-sm font-semibold duration-300 ease-in-out hover:bg-neutral-300"
          >
            <FcGoogle size={24} />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </ModalLeftSlider>
  );
};

export default AuthForm;
