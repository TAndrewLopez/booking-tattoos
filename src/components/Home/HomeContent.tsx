import useLayout from "@/hooks/global/useLayout";
import { AnimatePresence, motion } from "framer-motion";

const HomeContent: React.FC = () => {
  const { modalName, setModalName } = useLayout();

  return (
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
            <h1 className="mb-4 text-3xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Schedule your tattoo with{" "}
              <p className="inline-block bg-gradient-to-r from-sky-500 to-white bg-clip-text text-transparent sm:block">
                Raquel Cude
              </p>
            </h1>
            <button
              onClick={() => setModalName("request")}
              className="text-shade-1 bg-accent hover:bg-highlight hover:text-shade-9 inline-flex items-center justify-center rounded-lg border-2 border-white/0 px-5 py-3 text-center text-base font-medium transition hover:border-2 hover:border-white/100 hover:font-extrabold"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomeContent;
