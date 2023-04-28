import useAppointmentModal from "@/hooks/useAppointmentModal";
import type { NextPage } from "next";
import { useCallback } from "react";
import { GrInstagram } from "react-icons/gr";
import { SlGlobe } from "react-icons/sl";

const Home: NextPage = () => {
  const { isOpen, openModal, closeModal } = useAppointmentModal();

  const toggleModal = useCallback(() => {
    if (isOpen) return closeModal();
    openModal();
  }, [isOpen, openModal, closeModal]);

  return (
    <main className="absolute left-0 top-0 z-40 h-full w-full bg-[url('/images/shop.jpg')] bg-cover bg-center bg-no-repeat p-4">
      <div className="absolute left-0 top-0 z-40 h-full w-full bg-black/60"></div>
      <div className="flex h-full w-full items-center justify-center">
        <div className="absolute top-1/2 z-50 flex -translate-y-1/2 flex-col items-center p-5 text-center text-white">
          <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
            Schedule your tattoo with{" "}
            <p className="inline-block bg-gradient-to-r from-sky-500 to-white bg-clip-text text-transparent sm:block">
              Raquel Cude
            </p>
          </h1>

          <button
            onClick={toggleModal}
            className="text-shade-1 bg-accent hover:bg-highlight hover:text-shade-9 inline-flex items-center justify-center rounded-lg border-2 border-white/0 px-5 py-3 text-center text-base font-medium transition hover:border-2 hover:border-white/100 hover:font-extrabold focus:ring-4 focus:ring-blue-300"
          >
            Request Tattoo
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="fixed bottom-4 z-50 flex cursor-pointer gap-5">
          <SlGlobe
            title="Personal Site"
            className="h-6 w-6 text-neutral-100 transition hover:text-blue-300 md:h-8 md:w-8"
            onClick={() => window.open("https://raquelcude.com/", "_blank")}
          />
          <GrInstagram
            title="Instagram"
            size={24}
            className="h-6 w-6 text-neutral-100 transition hover:text-blue-300 md:h-8 md:w-8"
            onClick={() =>
              window.open("https://www.instagram.com/raquelcood/", "_blank")
            }
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
