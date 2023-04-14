import Image from "next/image";

interface SidebarProps {
  page: number;
}

const Sidebar: React.FC<SidebarProps> = ({ page }) => {
  return (
    <div className="md:cols-span-1 relative mb-4 min-h-[100px] md:mb-0 md:mr-4 md:h-full">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 bg-black/30" />
      <Image
        fill
        style={{
          objectFit: "contain",
          objectPosition: "bottom",
        }}
        alt="form-image"
        src="/images/tattooSign.png"
      />

      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <ul className="flex gap-4">
          <div className="flex items-center gap-3">
            <li
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2  px-2 text-sm transition
                  ${page === 0 ? "bg-neutral-100" : "text-neutral-100"}
                  `}
            >
              1
            </li>
          </div>
          <div className="flex items-center gap-3">
            <li
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2  px-2 text-sm transition
                  ${page === 1 ? "bg-neutral-100" : "text-neutral-100"}
                  `}
            >
              2
            </li>
          </div>
          <div className="flex items-center gap-3">
            <li
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2  px-2 text-sm transition
                  ${page === 2 ? "bg-neutral-100" : "text-neutral-100"}
                  `}
            >
              3
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
