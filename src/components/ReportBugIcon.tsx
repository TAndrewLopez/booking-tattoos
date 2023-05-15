import useLayout from "@/hooks/global/useLayout";
import { useSession } from "next-auth/react";
import { GiSpottedBug } from "react-icons/gi";

const ReportBugIcon = () => {
  const { data: sessionData } = useSession();
  const { setModalName } = useLayout();
  if (!sessionData?.user) return null;
  return (
    <div
      className="fixed bottom-0 left-0 z-10 cursor-pointer rounded-t border-2 border-neutral-300/70 bg-neutral-300/70 p-1.5 text-black transition hover:border-2 hover:border-sky-400 hover:bg-white/100 hover:text-sky-400 md:left-3"
      onClick={() => setModalName("bug")}
    >
      <GiSpottedBug size={26} />
    </div>
  );
};

export default ReportBugIcon;
