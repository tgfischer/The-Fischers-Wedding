import type { NextPage } from "next";
import Head from "next/head";

import { Home } from "../components/Home";

const HomePage: NextPage = () => (
  <div>
    <Head>
      <title>{"The Fischer's Wedding"}</title>
    </Head>
    <Home />
  </div>
);

export default HomePage;
