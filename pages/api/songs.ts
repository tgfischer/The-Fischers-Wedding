import { Parser } from "json2csv";

import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate,
  serverSupabase
} from "../../src/middleware";
import type { EmptyResponse, SongDto } from "../../src/types";

const exportSongsHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  res
}) => {
  const {
    data: songs,
    error,
    status
  } = await serverSupabase
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
    .neq("name", "")
    .order("name");

  if (error) {
    console.error(error);
    return { status, error: error.message };
  }

  const parser = new Parser({
    fields: [
      { label: "Name", value: "name" },
      { label: "Artist", value: "artist" }
    ]
  });
  const data = parser.parse(songs ?? []);

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment;filename=songs.csv");
  res.status(200).send(Buffer.from(data));

  return { status: 200 };
};

const handler = apiPipeline({
  GET: [authenticate, exportSongsHandler]
});

export default handler;
