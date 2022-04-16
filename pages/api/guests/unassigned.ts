import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../src/middleware";
import { UnassignedGuestDto, UnassignedGuestsDto } from "../../../src/types";

const getUnassignedGuestsHandler: EndpointPipelineHandler<
  UnassignedGuestsDto
> = async ({ res, supabase }) => {
  const {
    data: guests,
    error,
    status
  } = await supabase.rpc<UnassignedGuestDto>("unassigned_guests_query");

  if (error) {
    console.error(error);
    return { status, error: `${error.message} (${error.hint})` };
  }

  res.status(200).json({ guests });
  return { status: 200 };
};

const handler = apiPipeline({
  GET: [authenticate, getUnassignedGuestsHandler]
});

export default handler;
