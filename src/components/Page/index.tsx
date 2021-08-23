import Head from "next/head";
import { ReactNode } from "react";

export type PageProps = JSX.IntrinsicElements["div"] & {
  pageTitle: string | ReactNode;
};

export const Page = ({
  pageTitle,
  children,
  ...props
}: PageProps): JSX.Element => (
  <div {...props}>
    <Head>
      <title>{pageTitle}</title>
    </Head>
    {children}
  </div>
);
