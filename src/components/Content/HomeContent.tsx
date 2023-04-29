interface HomeContentProps {
  toggleModal: () => void;
}

const HomeContent: React.FC<HomeContentProps> = ({ toggleModal }) => {
  return (
    <>
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
    </>
  );
};

export default HomeContent;
