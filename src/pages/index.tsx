import HomeContent from "@/components/Content/HomeContent";
import useLayout from "@/hooks/global/useLayout";
import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import { GrInstagram } from "react-icons/gr";
import { SlGlobe } from "react-icons/sl";

const Home: NextPage = () => {
  const { modalName } = useLayout();

  return (
    <main className="absolute inset-0 overflow-x-hidden bg-shop bg-cover bg-center bg-no-repeat p-4">
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <AnimatePresence>
        {!modalName && (
          <motion.div
            initial={{
              opacity: 0.3,
              x: "-150%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0.3,
              x: "-150%",
            }}
            className="flex h-full w-full items-center justify-center"
          >
            <div
              className={`absolute top-1/2 flex -translate-y-1/2 flex-col items-center p-5 text-center text-white duration-300`}
            >
              <HomeContent />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer gap-5">
        <SlGlobe
          title="Personal Site"
          className="h-6 w-6 text-neutral-100 transition hover:text-blue-300 md:h-8 md:w-8"
          onAuxClick={() => window.open("https://raquelcude.com/", "_blank")}
          onClick={() => window.open("https://raquelcude.com/", "_blank")}
        />
        <GrInstagram
          title="Instagram"
          className="h-6 w-6 text-neutral-100 transition hover:text-blue-300 md:h-8 md:w-8"
          onAuxClick={() =>
            window.open("https://www.instagram.com/raquelcood/", "_blank")
          }
          onClick={() =>
            window.open("https://www.instagram.com/raquelcood/", "_blank")
          }
        />
      </div>
    </main>
  );
};

export default Home;
