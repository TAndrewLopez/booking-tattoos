import useLoginModal from "@/hooks/global/useLoginModal";
import { validateEmail } from "@/utils/validation";
import { signIn } from "next-auth/react";
import { useCallback, type SyntheticEvent, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Input from "../Inputs/Input";
import FromRightModal from "../AnimatedContainers/FromRightModal";
import useLayout from "@/hooks/global/useLayout";
import { api } from "@/utils/api";
import RememberInput from "../Inputs/RememberInput";

const AuthForm = () => {
  const { email, password, setValue, inputError, setInputError } =
    useLoginModal();
  const { modalName, setModalName } = useLayout();
  const [authForm, setAuthForm] = useState("");
  const [remember, setRemember] = useState(false);
  const isLoginForm = authForm === "login";
  const createUser = api.user.createUser.useMutation();

  const handleSubmit = useCallback(
    async (evt: SyntheticEvent) => {
      evt.preventDefault();
      if (inputError) setInputError("");

      if (!validateEmail(email)) {
        setInputError("email");
        return toast.error(
          "Please enter a valid email:\n(ex: user@provider.com)"
        );
      }
      if (!password) {
        setInputError("password");
        return toast.error("Invalid Password");
      }

      if (isLoginForm) {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (res?.error) toast.error(res.error);

        // HANDLE REMEMBER ME STATE
        const hasRememberMeToggled = localStorage.getItem("remember");
        if (remember) localStorage.setItem("remember", email);
        if (!remember && hasRememberMeToggled)
          localStorage.removeItem("remember");

        console.log("toggle remember");
      } else {
        createUser.mutate({ email, password, role: "user" });
      }
      setModalName("");
      setValue("email", "");
      setValue("password", "");
    },
    [
      remember,
      setModalName,
      email,
      password,
      inputError,
      setInputError,
      setValue,
      createUser,
      isLoginForm,
    ]
  );

  useEffect(() => {
    if (modalName && !authForm) setAuthForm("login");
  }, [modalName, authForm]);

  useEffect(() => {
    const hasRememberMeToggled = localStorage.getItem("remember");
    if (hasRememberMeToggled) {
      setRemember(!!hasRememberMeToggled);
      setValue("email", hasRememberMeToggled);
    }
  }, [setValue]);

  return (
    <FromRightModal containerName="auth">
      <div className="flex flex-col items-center text-center">
        <form className="flex w-[300px] flex-col gap-5">
          <h1 className="text-shade-1 bg-gradient-to-r from-white to-sky-500 bg-clip-text text-4xl font-extrabold text-transparent">
            {isLoginForm ? "Account Login" : "Create Account"}
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
          <RememberInput
            label="Remember for next time"
            remember={remember}
            onClick={() => setRemember(!remember)}
          />
          <button
            type="submit"
            className="rounded bg-gradient-to-b from-sky-400 to-sky-600 p-4 tracking-wider transition hover:bg-gradient-to-t hover:font-bold"
            onClick={(evt) => void handleSubmit(evt)}
          >
            Submit
          </button>
        </form>
        <button
          onClick={() =>
            setAuthForm((prev) => {
              return prev === "login" ? "create" : "login";
            })
          }
          className="mt-3"
        >
          <p className="cursor-pointer text-white hover:text-sky-500 hover:underline">
            {isLoginForm ? "Create an account" : "Existing user login"}
          </p>
        </button>
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
    </FromRightModal>
  );
};

export default AuthForm;
