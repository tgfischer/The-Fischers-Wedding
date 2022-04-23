import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../../src/middleware";
import {
  EmptyResponse,
  TableData,
  UpdateTableOrderBody
} from "../../../../src/types";

/**
 * @todo: This should live in a Postgres function, wrapped in a transaction.
 */
const updateTableOrderHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const tableId = Number.parseInt(req.query.tableId as string);
  const { prevOrder, nextOrder }: UpdateTableOrderBody = req.body;

  const otherRowResult = await supabase
    .from<TableData>("tables")
    .select()
    .eq("tableNumber", nextOrder)
    .limit(1);

  if (otherRowResult.error) {
    return {
      status: otherRowResult.status,
      error: `${otherRowResult.error.message} (${otherRowResult.error.details})`
    };
  }

  if (otherRowResult.data.length === 0) {
    return { status: 403, error: "Unable to swap the tables" };
  }

  const updateOrderResult = await supabase
    .from("tables")
    .update({ tableNumber: nextOrder })
    .eq("id", tableId);

  if (updateOrderResult.error) {
    return {
      status: updateOrderResult.status,
      error: `${updateOrderResult.error.message} (${updateOrderResult.error.hint})`
    };
  }

  /**
   * Jesus take the wheel
   */
  const updateOtherOrderResult = await supabase
    .from("tables")
    .update({ tableNumber: prevOrder })
    .eq("id", otherRowResult.data[0].id);

  if (updateOtherOrderResult.error) {
    return {
      status: updateOtherOrderResult.status,
      error: `${updateOtherOrderResult.error.message} (${updateOtherOrderResult.error.hint})`
    };
  }

  res.status(201).json({});
  return { status: 200 };
};

const handler = apiPipeline({
  PATCH: [authenticate, updateTableOrderHandler]
});

export default handler;
