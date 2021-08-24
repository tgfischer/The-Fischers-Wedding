import type { GetServerSideProps } from "next";

import {
  DashboardPage,
  DashboardPageProps
} from "../src/components/DashboardPage";
import { supabase } from "../src/supabase";
import { ReservationDto } from "../src/types";

const Dashboard = (props: DashboardPageProps): JSX.Element => (
  <DashboardPage {...props} />
);

const reservationQuery = `
  id,
  address,
  song,
  createdAt,
  updatedAt,
  guests (
    id,
    firstName,
    lastName,
    status,
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

export default Dashboard;
