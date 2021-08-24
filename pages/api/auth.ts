import { NextApiRequest, NextApiResponse } from "next";

import { verifyMethod } from "../../src/middleware";
import { supabase } from "../../src/supabase";

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  if (!verifyMethod(req, res, "POST")) {
    return;
  }

  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
