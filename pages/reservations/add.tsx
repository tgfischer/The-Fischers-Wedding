import type { GetServerSideProps } from "next";

import {
  ManageReservationPage,
  ManageReservationPageProps
} from "../../src/components/ManageReservationPage";
import { supabase } from "../../src/supabase";

const AddReservation = (props: ManageReservationPageProps): JSX.Element => (
  <ManageReservationPage {...props} />
);

export const getServerSideProps: GetServerSideProps<ManageReservationPageProps> =
  async (context) => {
    const { user } = await supabase.auth.api.getUserByCookie(context.req);
    if (!user) {
      return { redirect: { destination: "/", permanent: false } };
    }

    return { props: { user, reservation: undefined } };
  };

export default AddReservation;
