import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../src/middleware";
import { AddTableAssignmentBody, EmptyResponse } from "../../../src/types";

const addTableAssignmentHandler: EndpointPipelineHandler<
  EmptyResponse
> = async ({ req, res, supabase }) => {
  const { guestId, tableId }: AddTableAssignmentBody = req.body;
  const { error, status } = await supabase
    .from("tableAssignments")
    .insert({ guestId, tableId });

  if (error) {
    console.error(error);
    return { status, error: `${error.message} (${error.hint})` };
  }

  res.status(201).json({});
  return { status: 200 };
};

const handler = apiPipeline({
  POST: [authenticate, addTableAssignmentHandler]
});

export default handler;
