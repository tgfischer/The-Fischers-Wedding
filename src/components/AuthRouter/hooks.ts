import { useRouter } from "next/router";
import { useEffect } from "react";

import { supabase, setUserSession } from "../../supabase";

export const useAuthRouter = (): void => {
  const { replace } = useRouter();

  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.substr(1));
    if (hash.get("type") === "recovery") {
      replace("/reset-password");
      return;
    }
  }, [replace]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          replace("/reset-password");
        }
        if (["USER_UPDATED", "SIGNED_OUT"].includes(event)) {
          replace("/login");
        }

        setUserSession(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [replace]);
};
