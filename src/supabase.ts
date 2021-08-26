import { AuthChangeEvent, createClient, Session } from "@supabase/supabase-js";

type AuthenticatedRequest = {
  method: string;
  headers?: Record<string, unknown>;
  body?: Record<string, unknown>;
};

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ""
);

export const authenticatedRequest = async <TResponse>(
  url: string,
  { method, headers, body }: AuthenticatedRequest
): Promise<TResponse> =>
  fetch(url, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: new Headers({ "Content-Type": "application/json", ...headers }),
    credentials: "same-origin"
  }).then((res) => res.json() as Promise<TResponse>);

export const setUserSession = async (
  event: AuthChangeEvent,
  session: Session | null
): Promise<void> => {
  await authenticatedRequest("/api/auth", {
    method: "POST",
    body: { event, session }
  });
};
