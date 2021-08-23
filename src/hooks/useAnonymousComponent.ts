import { Auth } from "@supabase/ui";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAnonymousComponent = (): void => {
  const { user } = Auth.useUser();
  const { replace } = useRouter();

  useEffect(() => {
    if (user) {
      replace("/");
      return;
    }
  }, [replace, user]);
};
