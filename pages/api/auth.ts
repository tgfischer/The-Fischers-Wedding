import { apiPipeline, EndpointPipelineHandler } from "../../src/middleware";
import { EmptyResponse } from "../../src/types";

const setTokenHandler: EndpointPipelineHandler<EmptyResponse> = ({
  req,
  res,
  supabase
}) => {
  supabase.auth.api.setAuthCookie(req, res);
  return { status: 200 };
};

const handler = apiPipeline({
  POST: [setTokenHandler]
});

export default handler;
