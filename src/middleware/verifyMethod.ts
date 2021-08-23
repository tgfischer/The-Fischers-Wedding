import type { NextApiRequest, NextApiResponse } from "next";

export const verifyMethod = <TData>(
  req: NextApiRequest,
  res: NextApiResponse<TData>,
  ...methods: string[]
): boolean => {
  if (!req.method || !methods.includes(req.method)) {
    res.status(405).end();
    return false;
  }

  return true;
};
