import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../src/middleware";
import { EmptyResponse } from "../../../src/types";

const deleteTableHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const tableId = Number.parseInt(req.query.tableId as string);

  const deleteAssignmentsResult = await supabase
    .from("tableAssignments")
    .delete()
    .eq("tableId", tableId);

  if (deleteAssignmentsResult.error) {
    console.error(deleteAssignmentsResult.error);
    return {
      status: deleteAssignmentsResult.status,
      error: `${deleteAssignmentsResult.error.message} (${deleteAssignmentsResult.error.hint})`
    };
  }

  const deleteTablesResult = await supabase
    .from("tables")
    .delete()
    .eq("id", tableId);

  if (deleteTablesResult.error) {
    console.error(deleteTablesResult.error);
    return {
      status: deleteTablesResult.status,
      error: `${deleteTablesResult.error.message} (${deleteTablesResult.error.hint})`
    };
  }

  res.status(201).json({});
  return { status: 200 };
};

const handler = apiPipeline({
  DELETE: [authenticate, deleteTableHandler]
});

export default handler;
