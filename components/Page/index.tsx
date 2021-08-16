export type PageProps = JSX.IntrinsicElements["div"];

export const Page = ({ children, ...props }: PageProps): JSX.Element => (
  <div {...props}>{children}</div>
);
