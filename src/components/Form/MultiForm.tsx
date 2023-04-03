import ContactForm from "@/components/Form/ContactForm";
import TattooForm from "@/components/Form/TattooForm";
import Image from "next/image";
import { useCallback, useState } from "react";
import ReviewAptEntries from "./ReviewAptEntries";
import MultiFormButtons from "./MultiFormButtons";
import useAppointmentStore from "@/state/store";

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
        <div className="md:cols-span-1 relative mb-4 min-h-[100px] md:mb-0 md:mr-4 md:h-full">
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <ul className="flex gap-4 md:flex-col">
              <li className="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 text-sm">
                1
              </li>
              <li className="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 text-sm">
                2
              </li>
              <li className="flex h-6 w-6 items-center justify-center rounded-full bg-red-200 text-sm">
                3
              </li>
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
                name,
                preferredPronouns,
                email,
                phoneNumber,
                description,
                size,
                placement,
                color,
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
          handleSubmit={handleSubmit}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default MultiForm;
