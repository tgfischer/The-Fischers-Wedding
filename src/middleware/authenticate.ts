import { EmptyResponse } from "../types";

import { EndpointPipelineHandler } from "./apiPipeline";

export const authenticate: EndpointPipelineHandler<EmptyResponse> = async ({
  req,
  supabase
}) => {
  const { user, error } = await supabase.auth.api.getUserByCookie(req);
  return user
    ? { status: 200 }
    : {
        status: 500,
        error: error?.message ?? ""
      };
};
