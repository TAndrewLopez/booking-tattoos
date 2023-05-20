import CalendarSidebar from "@/components/Calendar/CalendarSidebar";
import Month from "@/components/Calendar/Month";
import useCalendarStore from "@/hooks/global/useCalendarStore";
import { getMonth } from "@/utils/calendar";
import { motion } from "framer-motion";
import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

/*
  PAGE CONTENT
    CALENDAR
*/

const Schedule: NextPage = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex } = useCalendarStore();
  const [lightText, setLightText] = useState(false);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <main className="absolute inset-0 overflow-x-hidden bg-shop bg-cover bg-center bg-no-repeat p-4">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative top-20 gap-5 p-1 md:flex md:w-fit md:p-4">
        <CalendarSidebar lightText={lightText} />
        <motion.div
          initial={{
            opacity: 0.3,
            x: "150%",
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.25,
            type: "spring",
            duration: 0.3,
          }}
        >
          <Month
            showHeader
            headerUtilityName={lightText ? "Dark" : "Light"}
            headerUtility={() => setLightText(!lightText)}
            lightText={lightText}
            month={currentMonth}
          />
        </motion.div>
      </div>
    </main>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default Schedule;
