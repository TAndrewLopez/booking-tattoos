import { GrInstagram } from "react-icons/gr";
import { SlGlobe } from "react-icons/sl";

export default function HomeFooter() {
  return (
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
  );
}
