import type { GetServerSideProps } from "next";

import {
  ReservationsPage,
  ReservationsPageProps
} from "../src/components/ReservationsPage";
import { supabase } from "../src/supabase";
import { ReservationDto } from "../src/types";

const Reservations = (props: ReservationsPageProps): JSX.Element => (
  <ReservationsPage {...props} />
);

const reservationQuery = `
  id,
  address,
  createdAt,
  updatedAt,
  guests (
    id,
    firstName,
    lastName,
    status,
    song,
    meal,
    createdAt,
    updatedAt
  )
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data, error } = await supabase
    .from<ReservationDto>("reservations")
    .select(reservationQuery);

  return { props: { user, reservations: data, error } };
};

export default Reservations;
