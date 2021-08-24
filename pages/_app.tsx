import { Auth } from "@supabase/ui";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";

import { AuthRouter } from "../src/components/AuthRouter";
import { supabase } from "../src/supabase";

import "../src/styles/app.scss";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Auth.UserContextProvider supabaseClient={supabase}>
    <AuthRouter>
      <NextNprogress color="#a63b35" />
      <Component {...pageProps} />
    </AuthRouter>
  </Auth.UserContextProvider>
);

export default App;
