import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../src/middleware";
import {
  AddTableBody,
  EmptyResponse,
  TableDto,
  TablesDto
} from "../../../src/types";

const getTablesHandler: EndpointPipelineHandler<TablesDto> = async ({
  res,
  supabase
}) => {
  const {
    data: tables,
    error,
    status
  } = await supabase.from<TableDto>("tables").select(
    `id,
      name,
      guests (
        id,
        firstName,
        lastName,
        status,
        meal
      )
    `
  );

  if (error) {
    console.error(error);
    return { status, error: `${error.message} (${error.hint})` };
  }

  res.status(200).json({ tables });
  return { status: 200 };
};

const addTableHandler: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  res,
  supabase
}) => {
  const { name }: AddTableBody = req.body;
  const { error, status } = await supabase.from("tables").insert({ name });

  if (error) {
    console.error(error);
    return { status, error: `${error.message} (${error.hint})` };
  }

  res.status(201).json({});
  return { status: 200 };
};

const handler = apiPipeline({
  GET: [authenticate, getTablesHandler],
  POST: [authenticate, addTableHandler]
});

export default handler;
