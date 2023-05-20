import useLayout from "@/hooks/global/useLayout";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode } from "react";

interface FromRightModalProps {
  containerName: string;
  children: ReactNode;
}

const FromRightModal: React.FC<FromRightModalProps> = ({
  containerName,
  children,
}) => {
  const { modalName } = useLayout();

  return (
    <AnimatePresence>
      {modalName === containerName && (
        <motion.div
          initial={{
            opacity: 0.75,
            x: "150%",
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0.5,
            x: "150%",
          }}
          className="fixed left-0 top-0 z-20 flex h-screen w-full items-center justify-center"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FromRightModal;
