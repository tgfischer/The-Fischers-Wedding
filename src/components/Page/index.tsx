import Head from "next/head";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";

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
    <ToastContainer
      toastStyle={{
        fontFamily: "'Source Serif Pro', serif",
        fontSize: "0.9rem"
      }}
      hideProgressBar
    />
    {children}
  </div>
);
