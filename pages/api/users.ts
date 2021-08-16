import type { NextApiRequest, NextApiResponse } from "next";

import { verifyMethod } from "../../server/middleware";

type Data = {
  name: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse<Data>): void => {
  if (!verifyMethod(req, res, "GET")) {
    return;
  }

  res.status(200).json({ name: "John Doe" });
};

export default handler;
