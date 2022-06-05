import type { GetServerSideProps } from "next";

import { AddReservationPage } from "../../src/components/ManageReservationPage";
import { AddReservationPageProps } from "../../src/components/ManageReservationPage/types";
import { serverSupabase } from "../../src/middleware";

const AddReservation = (props: AddReservationPageProps): JSX.Element => (
  <AddReservationPage {...props} />
);

export const getServerSideProps: GetServerSideProps<
  AddReservationPageProps
> = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(
    context.req,
    context.res
  );
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: { user } };
};

export default AddReservation;
