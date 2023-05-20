import SubCard from "@/components/Submissions/SubCard";
import SubmissionSidebar from "@/components/Submissions/SubmissionSidebar";
import useLayout from "@/hooks/global/useLayout";
import useAdminUtility from "@/hooks/useAdminUtility";
import { motion } from "framer-motion";
import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

/*
  PAGE CONTENTS:
    SUBMISSIONS SIDEBAR
      FILTER FEATURE
      SEARCH FEATURE
    SUBMISSIONS LIST
      UNFILTERED APPOINTMENTS
      FILTERED APPOINTMENTS
      SEARCHED APPOINTMENTS
      SEARCHED SUBMISSION WITH FILTERS
*/

const Submissions: NextPage = () => {
  const { data: sessionData } = useSession();
  const { isMobile } = useLayout();
  const {
    aptData,
    filteredSearchNameSubmissions,
    filteredSubmissions,
    filters,
    searchName,
    searchNameSubmissions,
    setFilters,
    setSearchName,
  } = useAdminUtility();

  return (
    <main className="relative top-20 flex gap-5 p-4">
      <SubmissionSidebar
        search={searchName}
        setSearch={setSearchName}
        filters={filters}
        setFilters={setFilters}
        footerChildren={
          <>
            Total Submissions: <span>{aptData?.length}</span>
          </>
        }
      />

      <motion.div
        // initial={{
        //   opacity: 0.3,
        //   x: "100%",
        // }}
        // animate={{
        //   opacity: 1,
        //   x: 0,
        //   transition: {
        //     delay: 0.3,
        //   },
        // }}
        className="flex w-full flex-wrap justify-center gap-5 gap-x-14 overflow-x-hidden"
      >
        {!filters.length &&
          !searchName.length &&
          !searchNameSubmissions.length &&
          aptData?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}
        {!!filters.length &&
          !searchName.length &&
          !searchNameSubmissions.length &&
          filteredSubmissions?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}
        {!!searchNameSubmissions.length &&
          !filters.length &&
          searchNameSubmissions?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}
        {!!filters.length &&
          !!searchNameSubmissions.length &&
          filteredSearchNameSubmissions?.map((data) => (
            <SubCard
              userId={sessionData?.user.id as string}
              data={data}
              key={data.id}
            />
          ))}
      </motion.div>
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

export default Submissions;
