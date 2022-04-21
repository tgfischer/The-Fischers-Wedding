import { EmptyResponse } from "../types";

import { EndpointPipelineHandler } from "./apiPipeline";

export const authenticate: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  supabase
}) => {
  const { user, error } = await supabase.auth.api.getUserByCookie(req);

  if (error) {
    return { status: 404, error: error.message };
  }

  if (!user) {
    return { status: 404, error: "Resource not found" };
  }

  return { status: 200 };
};
