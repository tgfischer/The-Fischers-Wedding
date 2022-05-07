import type { GetServerSideProps } from "next";

import { MealsPage, MealsPageProps } from "../src/components/MealsPage";
import { serverSupabase } from "../src/middleware";
import { GuestData, MealRestrictionDto, TableData } from "../src/types";

const Meals = (props: MealsPageProps): JSX.Element => <MealsPage {...props} />;

type MealRestrictionQueryData = Pick<
  GuestData,
  "id" | "firstName" | "lastName" | "meal"
> & {
  tables: Pick<TableData, "tableNumber">[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data: guests, error } = await serverSupabase
    .from<MealRestrictionQueryData>("guests")
    .select("id, firstName, lastName, meal, tables(tableNumber)")
    .not("meal", "is", null)
    .neq("meal", "")
    .neq("meal", "No")
    .neq("meal", "no")
    .order("firstName");

  const meals: MealRestrictionDto[] =
    guests?.map(({ id, firstName, lastName, meal, tables }) => ({
      id,
      firstName,
      lastName,
      meal,
      tableNumber: tables.length === 0 ? null : tables[0].tableNumber
    })) ?? [];

  return {
    props: { user, meals, error }
  };
};

export default Meals;
