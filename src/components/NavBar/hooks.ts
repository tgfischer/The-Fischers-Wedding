import { supabase } from "../../supabase";

type UseNavBarInstance = {
  handleSignOut: () => Promise<void>;
};

export const useNavBar = (): UseNavBarInstance => {
  return {
    handleSignOut: async () => {
      await supabase.auth.signOut();
    }
  };
};
