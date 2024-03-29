import { SupabaseClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

import { serverSupabase } from "../middleware";
import { ErrorResponse } from "../types";

type CallbackParams<TResponseData, TError = unknown> = {
  req: NextApiRequest;
  res: NextApiResponse<TResponseData | TError | Buffer>;
  supabase: SupabaseClient;
};

export type SuccessResult = {
  status: number;
  error?: never;
};

export type FailedResult = {
  status: number;
  error: string;
};

type EndpointResult = SuccessResult | FailedResult;

export type EndpointPipelineHandler<TResponseData, TError = ErrorResponse> = (
  params: CallbackParams<TResponseData, TError>
) => Promise<EndpointResult> | EndpointResult;

type EndpointPipeline = Record<
  string,
  EndpointPipelineHandler<unknown, unknown>[]
>;

export const apiPipeline =
  (endpoints: EndpointPipeline) =>
  async <TResponseData>(
    req: NextApiRequest,
    res: NextApiResponse<TResponseData | ErrorResponse | Buffer>
  ): Promise<void> => {
    const method = req.method ?? "";
    const pipeline = endpoints[
      method
    ] as EndpointPipelineHandler<TResponseData>[];

    if (!pipeline) {
      return res.status(405).end();
    }

    for (const endpoint of pipeline) {
      const { status, error } = await endpoint({
        req,
        res,
        supabase: serverSupabase
      });

      if (error) {
        console.error(`Error: ${error}, Status: ${status}`);
        return res.status(status).json({ error });
      }
    }
  };
