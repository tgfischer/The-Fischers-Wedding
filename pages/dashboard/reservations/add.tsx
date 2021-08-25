import type { GetServerSideProps } from "next";

import { AddReservationPage } from "../../../src/components/AddReservationPage";
import { supabase } from "../../../src/supabase";

const AddReservation = (): JSX.Element => <AddReservationPage />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: { user } };
};

export default AddReservation;
