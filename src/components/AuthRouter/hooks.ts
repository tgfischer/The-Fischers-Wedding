import { useRouter } from "next/router";
import { useEffect } from "react";

import { supabase } from "../../supabase";

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
    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        replace("/reset-password");
        return;
      }
      if (["USER_UPDATED", "SIGNED_OUT"].includes(event)) {
        replace("/login");
        return;
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [replace]);
};
