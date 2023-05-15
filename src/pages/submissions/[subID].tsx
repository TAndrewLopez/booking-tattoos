import { api } from "@/utils/api";
import { type NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

const SingleSubmission = () => {
  const router = useRouter();
  const { subID } = router.query;
  const { data: appointment } = api.appointment.getSingleAppointment.useQuery({
    id: subID as string,
  });

  if (!appointment) return null;

  return (
    <main className="g relative top-20 flex gap-5 bg-sky-400 p-4">
      SingleSubmission
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

export default SingleSubmission;
