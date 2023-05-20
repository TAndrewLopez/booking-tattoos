import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface FromLeftSidebarProps {
  border?: boolean;
  padded?: boolean;
  children: ReactNode;
}

const FromLeftSidebar = ({
  border,
  padded,
  children,
}: FromLeftSidebarProps) => {
  return (
    <motion.aside
      initial={{
        x: "-100%",
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className={`sticky top-[80px] hidden h-fit w-1/5 min-w-[300px] rounded md:block
      ${border ? "border shadow-lg" : ""}
      ${padded ? "p-6" : ""}
      `}
    >
      {children}
    </motion.aside>
  );
};

export default FromLeftSidebar;
