import type { GetServerSideProps } from "next";

import { MealsPage, MealsPageProps } from "../src/components/MealsPage";
import { serverSupabase } from "../src/middleware";
import { GuestData, MealRestrictionDto } from "../src/types";

const Meals = (props: MealsPageProps): JSX.Element => <MealsPage {...props} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data: guests, error } = await serverSupabase
    .from<GuestData>("guests")
    .select()
    .not("meal", "is", null)
    .neq("meal", "")
    .neq("meal", "No")
    .neq("meal", "no")
    .order("firstName");

  const meals: MealRestrictionDto[] =
    guests?.map(({ id, firstName, lastName, meal }) => ({
      id,
      firstName,
      lastName,
      meal
    })) ?? [];

  return {
    props: { user, meals, error }
  };
};

export default Meals;
