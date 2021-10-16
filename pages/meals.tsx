import { sortBy } from "lodash/fp";
import type { GetServerSideProps } from "next";

import { MealsPage, MealsPageProps } from "../src/components/MealsPage";
import { serverSupabase } from "../src/middleware";
import { ReservationDto } from "../src/types";

const Meals = (props: MealsPageProps): JSX.Element => <MealsPage {...props} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data, error } = await serverSupabase
    .from<ReservationDto>("reservations")
    .select();
  const meals = data
    ?.flatMap(({ guests }) =>
      guests.map(({ meal, firstName, lastName }) =>
        meal?.notes
          ? { restriction: meal.notes, name: `${firstName} ${lastName}` }
          : undefined
      )
    )
    .filter((meal) => Boolean(meal?.name) && Boolean(meal?.restriction));

  return {
    props: {
      user,
      meals: sortBy((meal) => meal?.name, meals),
      error
    }
  };
};

export default Meals;
