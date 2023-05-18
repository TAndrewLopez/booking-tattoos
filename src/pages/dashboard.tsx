import DashboardWidgets, {
  DashboardHeader,
  Widget,
} from "@/components/Dashboard";
import Table from "@/components/Table";
import { api } from "@/utils/api";
import { type NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Dashboard = () => {
  const { data: userData } = api.user.getAllUsers.useQuery();
  const { data: ticketData } = api.ticket.getAllTickets.useQuery();

  return (
    <main className="relative top-20 h-[93%] p-1 md:p-4">
      <DashboardWidgets>
        <DashboardHeader>
          <p className="text-lg font-semibold ">Developer Dashboard</p>
          <p className="text-xs text-neutral-500">{`Dashboard > Performance > Summary`}</p>
        </DashboardHeader>

        <div className="flex gap-5">
          <Widget
            customHex="text-[#1f2937]"
            title="Total Users"
            content={String(userData?.length)}
          />
          <Widget
            defaultColor="caution"
            title="Total Tickets"
            content={String(ticketData?.length)}
          />

          <Widget defaultColor="error" title="Listed Merchant" content="323" />
        </div>
      </DashboardWidgets>

      <div className="flex flex-col gap-5">
        <Table
          pagePath="users"
          showHeader
          tableName="user"
          tableColumnNames={["name", "email", "role"]}
          tableData={userData}
        />
        <Table
          pagePath="tickets"
          showHeader
          tableName="ticket"
          tableColumnNames={["category", "priority", "description", "steps"]}
          tableData={ticketData}
        />
        <Table
          showHeader
          tableName="something"
          tableColumnNames={["category", "priority", "description", "steps"]}
          tableData={ticketData}
        />
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

export default Dashboard;
