import Link, { LinkProps } from "next/link";
import { Nav } from "react-bootstrap";

import { ComponentWithChildrenProps } from "../types";

type NavBarLinkProps = Pick<LinkProps, "href"> & ComponentWithChildrenProps;

export const NavBarLink = ({
  href,
  className,
  children
}: NavBarLinkProps): JSX.Element => (
  <Link href={href} passHref>
    <Nav.Link className={className}>{children}</Nav.Link>
  </Link>
);
