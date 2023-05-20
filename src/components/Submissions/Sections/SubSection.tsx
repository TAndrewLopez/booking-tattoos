import { type ReactNode } from "react";

interface SubSectionProps {
  children: ReactNode;
}

const SubSection = ({ children }: SubSectionProps) => {
  return <section className="space-y-2 p-3">{children}</section>;
};

export default SubSection;
