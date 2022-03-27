import type { GetServerSideProps } from "next";

import {
  ReservationsPage,
  ReservationsPageProps
} from "../src/components/ReservationsPage";
import { serverSupabase } from "../src/middleware";
import { ReservationDto } from "../src/types";

const Reservations = (props: ReservationsPageProps): JSX.Element => (
  <ReservationsPage {...props} />
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data, error } = await serverSupabase.from<ReservationDto>(
    "reservations"
  ).select(`
      id,
      address,
      guests (
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
      ),
      invitations,
      createdAt,
      updatedAt
    `);

  return { props: { user, reservations: data ?? [], error } };
};

export default Reservations;
