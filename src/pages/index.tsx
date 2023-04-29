import HomeContent from "@/components/Content/HomeContent";
import LoginModal from "@/components/Modal/LoginModal";
import useAppointmentModal from "@/hooks/useAppointmentModal";
import useLoginModal from "@/hooks/useLoginModal";
import type { NextPage } from "next";
import { useCallback } from "react";
import { GrInstagram } from "react-icons/gr";
import { SlGlobe } from "react-icons/sl";

const Home: NextPage = () => {
  const { isOpen, openModal, closeModal } = useAppointmentModal();
  const { isOpen: visible } = useLoginModal();

  const toggleModal = useCallback(() => {
    if (isOpen) return closeModal();
    openModal();
  }, [isOpen, openModal, closeModal]);

  return (
    <main className="absolute left-0 top-0 z-40 h-full w-full bg-[url('/images/shop.jpg')] bg-cover bg-center bg-no-repeat p-4">
      <div className="absolute left-0 top-0 z-40 h-full w-full bg-black/60"></div>
      <div className="flex h-full w-full items-center justify-center">
        {/* CONTENT */}
        <div
          className={`absolute top-1/2 z-50 flex -translate-y-1/2 flex-col items-center p-5 text-center text-white duration-300
          ${visible ? "-translate-x-[1500px]" : "translate-x-0"}
          `}
        >
          <HomeContent toggleModal={toggleModal} />
        </div>
        {/* LOGIN MODAL */}
        <div
          className={`absolute top-1/2 z-50 flex -translate-y-1/2 flex-col items-center p-5 text-center text-white duration-300
          ${!visible ? "-translate-x-[1500px]" : "translate-x-0"}
          `}
        >
          <LoginModal />
        </div>

        {/* SOCIAL ICONS */}
        <div className="fixed bottom-4 z-50 flex cursor-pointer gap-5">
          <SlGlobe
            title="Personal Site"
            className="h-6 w-6 text-neutral-100 transition hover:text-blue-300 md:h-8 md:w-8"
            onAuxClick={() => window.open("https://raquelcude.com/", "_blank")}
            onClick={() => window.open("https://raquelcude.com/", "_blank")}
          />
          <GrInstagram
            title="Instagram"
            size={24}
            className="h-6 w-6 text-neutral-100 transition hover:text-blue-300 md:h-8 md:w-8"
            onAuxClick={() =>
              window.open("https://www.instagram.com/raquelcood/", "_blank")
            }
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
