import type { GetServerSideProps } from "next";

import {
  ManageReservationPage,
  ManageReservationPageProps
} from "../../../src/components/ManageReservationPage";
import { supabase } from "../../../src/supabase";
import { ReservationDto } from "../../../src/types";

const EditReservation = (props: ManageReservationPageProps): JSX.Element => (
  <ManageReservationPage {...props} />
);

const reservationQuery = `
  id,
  address,
  guests (
    id,
    firstName,
    lastName
  )
`;

type EditReservationParams = {
  reservationId: string;
};

export const getServerSideProps: GetServerSideProps<
  ManageReservationPageProps,
  EditReservationParams
> = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data, error } = await supabase
    .from<ReservationDto>("reservations")
    .select(reservationQuery)
    .eq("id", context.params?.reservationId)
    .limit(1);

  if (!data) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  return { props: { user, reservation: data[0], error } };
};

export default EditReservation;
