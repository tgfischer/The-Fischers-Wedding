import type { GetServerSideProps } from "next";

import { SongsPage, SongsPageProps } from "../src/components/SongsPage";
import { serverSupabase } from "../src/middleware";
import type { SongDto } from "../src/types";

const Songs = (props: SongsPageProps): JSX.Element => <SongsPage {...props} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user } = await serverSupabase.auth.api.getUserByCookie(context.req);
  if (!user) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const { data: songs, error } = await serverSupabase
    .from<SongDto>("songs")
    .select(
      `
      id,
      name,
      artist,
      requester:guestId (
        firstName,
        lastName
      )
    `
    )
    .order("name");
  if (error) {
    console.error(error);
  }

  return {
    props: {
      user,
      songs,
      error
    }
  };
};

export default Songs;
