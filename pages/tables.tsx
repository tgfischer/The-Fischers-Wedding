import type { NextPage, GetServerSideProps } from "next";

import {
  TableAssignmentsPage,
  TableAssignmentsPageProps
} from "../src/components/TableAssignmentsPage";
import { serverSupabase } from "../src/middleware";

const Tables: NextPage<TableAssignmentsPageProps> = (props) => (
  <TableAssignmentsPage {...props} />
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: { user } };
};

export default Tables;
