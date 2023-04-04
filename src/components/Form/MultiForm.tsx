import ContactForm from "@/components/Form/ContactForm";
import TattooForm from "@/components/Form/TattooForm";
import useAppointmentStore from "@/state/appointmentStore";
import Image from "next/image";
import { useCallback, useState } from "react";
import MultiFormButtons from "./MultiFormButtons";
import ReviewAptEntries from "./ReviewAptEntries";

const MultiForm = () => {
  // LOCAL STATE
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  // GLOBAL STATE
  const {
    name,
    preferredPronouns,
    email,
    phoneNumber,
    description,
    size,
    placement,
    color,
  } = useAppointmentStore();

  const handleSubmit = useCallback(() => {
    try {
      setIsLoading(true);
      console.log({
        name,
        preferredPronouns,
        email,
        phoneNumber,
        description,
        size,
        placement,
        color,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    preferredPronouns,
    email,
    phoneNumber,
    description,
    size,
    placement,
    color,
  ]);

  return (
    <div className="mx-5 ">
      <div className="mb-4 md:grid md:grid-cols-4">
        <div className="md:cols-span-1 relative mb-4 min-h-[100px] md:mb-0 md:mr-4 md:h-[484px]">
          <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/30" />
          <Image
            fill
            style={{
              objectFit: "cover",
              objectPosition: "bottom",
              borderRadius: "10px",
            }}
            alt="form-image"
            src="/images/tattooTray.jpg"
          />
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 sm:top-1/3 ">
            <ul className="flex gap-4 md:flex-col">
              <div className="flex items-center gap-3">
                <li
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2  px-2 text-sm transition
                  ${page === 0 ? "bg-neutral-100" : "text-neutral-100"}
                  `}
                >
                  1
                </li>
                <label
                  className={`m-auto hidden text-xs text-neutral-100 transition sm:block
                  ${page === 0 ? "underline" : ""}`}
                >
                  Personal
                </label>
              </div>
              <div className="flex items-center gap-3">
                <li
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2  px-2 text-sm transition
                  ${page === 1 ? "bg-neutral-100" : "text-neutral-100"}
                  `}
                >
                  2
                </li>
                <label
                  className={`m-auto hidden text-xs text-neutral-100 transition sm:block
                  ${page === 1 ? "underline" : ""}`}
                >
                  Tattoo
                </label>
              </div>
              <div className="flex items-center gap-3">
                <li
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2  px-2 text-sm transition
                  ${page === 2 ? "bg-neutral-100" : "text-neutral-100"}
                  `}
                >
                  3
                </li>
                <label
                  className={`m-auto hidden text-xs text-neutral-100 transition sm:block
                  ${page === 2 ? "underline" : ""}`}
                >
                  Review
                </label>
              </div>
            </ul>
          </div>
        </div>

        <div className="md:col-span-3">
          {page === 0 && (
            <ContactForm
              isLoading={isLoading}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
          {page === 1 && (
            <TattooForm
              isLoading={isLoading}
              inputError={inputError}
              setInputError={setInputError}
            />
          )}
          {page === 2 && (
            <ReviewAptEntries
              values={[
                { label: "Name", value: name },
                { label: "Preferred Pronouns", value: preferredPronouns },
                { label: "Email", value: email },
                { label: "Phone Number", value: phoneNumber },
                { label: "Description", value: description },
                { label: "Size", value: size },
                { label: "Placement", value: placement },
                { label: "Color", value: color },
              ]}
            />
          )}
        </div>
      </div>
      <div
        className={`
          flex w-full p-3
          ${page === 0 ? "justify-end" : ""}
          ${page > 0 ? "justify-between" : ""}
        `}
      >
        <MultiFormButtons
          inputError={setInputError}
          handleSubmit={handleSubmit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default MultiForm;
