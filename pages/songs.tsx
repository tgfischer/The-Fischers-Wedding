import { sortBy } from "lodash/fp";
import type { GetServerSideProps } from "next";

import { SongsPage, SongsPageProps } from "../src/components/SongsPage";
import { serverSupabase } from "../src/middleware";
import { ReservationDto } from "../src/types";

const Songs = (props: SongsPageProps): JSX.Element => <SongsPage {...props} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data, error } = await serverSupabase
    .from<ReservationDto>("reservations")
    .select();
  const songs = data
    ?.flatMap(({ guests }) =>
      guests.map(({ song, firstName, lastName }) =>
        song ? { song, requester: { firstName, lastName } } : undefined
      )
    )
    .filter(
      (request) => Boolean(request?.song.name) && Boolean(request?.song.artist)
    );

  return { props: { user, songs: sortBy(["song"], songs), error } };
};

export default Songs;
