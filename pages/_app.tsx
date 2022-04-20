import { Auth } from "@supabase/ui";
import type { AppProps } from "next/app";
import NextNprogress from "nextjs-progressbar";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { AuthRouter } from "../src/components/AuthRouter";
import { supabase } from "../src/supabase";

import "../src/styles/app.scss";
import "react-toastify/dist/ReactToastify.css";

const client = new QueryClient();

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Auth.UserContextProvider supabaseClient={supabase}>
    <QueryClientProvider client={client}>
      <AuthRouter>
        <NextNprogress color="#a63b35" options={{ showSpinner: false }} />
        <Component {...pageProps} />
      </AuthRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Auth.UserContextProvider>
);

export default App;
