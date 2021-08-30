import type { GetServerSideProps } from "next";

import { UpdateReservationPage } from "../../../src/components/ManageReservationPage";
import { UpdateReservationPageProps } from "../../../src/components/ManageReservationPage/types";
import { serverSupabase } from "../../../src/middleware";
import { ReservationDto } from "../../../src/types";

const UpdateReservation = (props: UpdateReservationPageProps): JSX.Element => (
  <UpdateReservationPage {...props} />
);

type UpdateReservationParams = {
  reservationId: string;
};

export const getServerSideProps: GetServerSideProps<
  UpdateReservationPageProps,
  UpdateReservationParams
> = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data, error } = await serverSupabase
    .from<ReservationDto>("reservations_v2")
    .select()
    .eq("id", context.params?.reservationId)
    .limit(1);

  if (!data) {
    return { redirect: { destination: "/404", permanent: false } };
  }

  return { props: { user, reservation: data[0], error } };
};

export default UpdateReservation;
