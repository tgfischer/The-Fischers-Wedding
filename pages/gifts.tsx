import type { GetServerSideProps } from "next";

import { GiftsPage, GiftsPageProps } from "../src/components/GiftsPage";
import { serverSupabase } from "../src/middleware";
import { GiftDto, GiftGuestDto } from "../src/types";

const Gifts = (props: GiftsPageProps): JSX.Element => <GiftsPage {...props} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data: gifts, error: giftsError } = await serverSupabase
    .from<GiftDto>("gifts")
    .select("id, description, guests(id, firstName, lastName)");

  console.debug(`Fetching the gifts: ${JSON.stringify(gifts)}`);

  const { data: guests, error: guestsError } = await serverSupabase
    .from<GiftGuestDto>("guests")
    .select("id, firstName, lastName")
    .order("firstName")
    .order("lastName");

  console.debug(`Fetching the guests: ${JSON.stringify(gifts)}`);

  return {
    props: { user, gifts, guests, error: giftsError ?? guestsError }
  };
};

export default Gifts;
