import type { GetServerSideProps, NextPage } from "next";

import {
  TableAssignmentsPage,
  TableManagementPageProps
} from "../src/components/TableAssignmentsPage";
import { serverSupabase } from "../src/middleware";
import type { GuestDto } from "../src/types";

const Tables: NextPage<TableManagementPageProps> = (props) => (
  <TableAssignmentsPage {...props} />
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data: guests, error } = await serverSupabase
    .from<GuestDto>("guests")
    .select(
      `
      id,
      firstName,
      lastName,
      songs (
        id,
        name,
        artist
      ),
      meal,
      status
      `
    )
    .neq("status", "not attending")
    .order("firstName")
    .order("lastName");

  if (error) {
    console.error(error);
    return { props: { error } };
  }

  return { props: { user, guests } };
};

export default Tables;
