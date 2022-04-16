import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../../src/middleware";
import { EmptyResponse } from "../../../../src/types";

const deleteTableAssignmentHandler: EndpointPipelineHandler<
  EmptyResponse
> = async ({ req, res, supabase }) => {
  const guestId = Number.parseInt(req.query.guestId as string);

  const { error, status } = await supabase
    .from("tableAssignments")
    .delete()
    .eq("guestId", guestId);

  if (error) {
    console.error(error);
    return { status, error: `${error.message} (${error.hint})` };
  }

  res.status(201).json({});
  return { status: 200 };
};

const handler = apiPipeline({
  DELETE: [authenticate, deleteTableAssignmentHandler]
});

export default handler;
