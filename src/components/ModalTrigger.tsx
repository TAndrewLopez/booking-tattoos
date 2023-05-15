import useLayout from "@/hooks/global/useLayout";
import { useRouter } from "next/router";
import { type ReactElement } from "react";

interface ModalTriggerProps {
  label?: string;
  modal?: string;
  Icon?: ReactElement;
  onClick?: () => void;
}

const ModalTrigger = ({ label, modal, Icon, onClick }: ModalTriggerProps) => {
  const { modalName } = useLayout();
  const { pathname } = useRouter();

  return (
    // STYLES JUST FOR MODAL TRIGGERS THAT ARE IN A NAV LIST
    <button
      className={`capitalize
      ${
        pathname === "/" && modalName === modal
          ? "border-b-2 border-sky-500"
          : ""
      }`}
      onClick={onClick}
    >
      {label}
      {Icon}
    </button>
  );
};

export default ModalTrigger;
