import type { GetServerSideProps } from "next";

import { AddReservationPage } from "../../src/components/ManageReservationPage";
import { serverSupabase } from "../../src/middleware";

const AddReservation = (): JSX.Element => <AddReservationPage />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: { user } };
};

export default AddReservation;
