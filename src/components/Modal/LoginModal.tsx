import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Form/Inputs/Input";
import { validateEmail } from "@/utils/validation";
import { toast } from "react-hot-toast";
import { type SyntheticEvent, useCallback } from "react";

const LoginModal = () => {
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
    <>
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
          onChange={({ target }) => setValue("email", target.value)}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          error={inputError === "password"}
          disabled={false}
          value={password}
          onChange={({ target }) => setValue("password", target.value)}
        />
        <button
          type="submit"
          className="rounded bg-gradient-to-b from-sky-400 to-sky-600 p-4 tracking-wider transition hover:bg-gradient-to-t hover:font-bold"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default LoginModal;
