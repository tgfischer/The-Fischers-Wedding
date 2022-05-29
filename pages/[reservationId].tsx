import type { GetServerSideProps } from "next";

import { SetReservationPage } from "../src/components/SetReservationPage";
import { SetReservationPageProps } from "../src/components/SetReservationPage/types";
import { serverSupabase } from "../src/middleware";
import { ReservationDto } from "../src/types";

const SetReservation = (props: SetReservationPageProps): JSX.Element => (
  <SetReservationPage {...props} />
);

type SetReservationPageParams = {
  reservationId: string;
};

export const getServerSideProps: GetServerSideProps<
  SetReservationPageProps,
  SetReservationPageParams
> = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);

  const { data, error } = await serverSupabase
    .from<ReservationDto>("reservations")
    .select(
      `
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
      `
    )
    .eq("id", context.params?.reservationId)
    .limit(1);

  if (!data?.[0]) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return {
    props: {
      reservation: { ...data[0], invitations: data[0].invitations.sort() },
      error,
      user
    }
  };
};

export default SetReservation;
