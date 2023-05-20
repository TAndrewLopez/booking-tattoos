import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardWidget from "@/components/Dashboard/DashboardWidget";
import DashboardWidgetContainer from "@/components/Dashboard/DashboardWidgetContainer";
import { api } from "@/utils/api";
import { type NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useMemo } from "react";

const Dashboard = () => {
  const { data: sessionData } = useSession();
  const { data: userData } = api.user.getAllUsers.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const { data: ticketData } = api.ticket.getAllTickets.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const newTickets = useMemo(() => {
    if (!ticketData) return [];
    return ticketData.filter((ticket) => !ticket.viewed);
  }, [ticketData]);

  return (
    <main className="relative top-20 h-[93%] p-1 md:px-4 md:pb-4">
      <DashboardWidgetContainer>
        <DashboardHeader>
          <p className="text-lg font-semibold ">Developer Dashboard</p>
        </DashboardHeader>
        <div className="flex gap-5">
          <DashboardWidget
            navigateOnClick="/tickets"
            defaultColor="success"
            title="Total Tickets"
            content={ticketData?.length ? ticketData.length : "0"}
          />
          <DashboardWidget
            navigateOnClick="/tickets"
            defaultColor="caution"
            title="New"
            content={newTickets.length ? newTickets.length : "0"}
          />
          <DashboardWidget
            navigateOnClick="/users"
            defaultColor="default"
            title="Total Users"
            content={userData?.length}
          />
        </div>
      </DashboardWidgetContainer>
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

export default Dashboard;
