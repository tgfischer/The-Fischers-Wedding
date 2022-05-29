import type { GetServerSideProps, NextPage } from "next";

import { HomePage, HomePageProps } from "../src/components/HomePage";
import { serverSupabase } from "../src/middleware";

const Home: NextPage<HomePageProps> = (props: HomePageProps) => (
  <HomePage {...props} />
);

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (
  context
) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  return { props: { user } };
};

export default Home;
