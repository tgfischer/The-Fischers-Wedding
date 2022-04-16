import type { NextPage, GetServerSideProps } from "next";

import { TableAssignmentsPage } from "../src/components/TableAssignmentsPage";
import { serverSupabase } from "../src/middleware";

const Tables: NextPage = TableAssignmentsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
};

export default Tables;
