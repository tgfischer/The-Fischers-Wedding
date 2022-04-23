import {
  EndpointPipelineHandler,
  apiPipeline,
  authenticate
} from "../../../src/middleware";
import {
  AddTableBody,
  EmptyResponse,
  TableAssignmentGuestDto,
  TableData,
  TablesDto
} from "../../../src/types";

type SelectTablesResult = TableData & {
  guests: TableAssignmentGuestDto[];
};

const getTablesHandler: EndpointPipelineHandler<TablesDto> = async ({
  res,
  supabase
}) => {
  const { data, error, status } = await supabase
    .from<SelectTablesResult>("tables")
    .select(
      "id, name, tableNumber, guests (id, firstName, lastName, status, meal)"
    )
    .order("tableNumber");

  if (error) {
    return { status, error: `${error.message} (${error.hint})` };
  }

  const tables = data.map((table, i) => {
    const prevTable = i === 0 ? undefined : data[i - 1];
    const nextTable = i === data.length - 1 ? undefined : data[i + 1];

    return {
      ...table,
      nextTableNumber: nextTable?.tableNumber,
      prevTableNumber: prevTable?.tableNumber
    };
  });

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
