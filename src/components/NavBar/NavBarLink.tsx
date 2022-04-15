import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import { Nav } from "react-bootstrap";

import { ComponentWithChildrenProps } from "../types";

type NavBarLinkProps = Pick<LinkProps, "href"> &
  ComponentWithChildrenProps & { active?: boolean };

export const NavBarLink = ({
  href,
  active,
  className,
  children
}: NavBarLinkProps): JSX.Element => (
  <Link href={href} passHref>
    <Nav.Link className={clsx(className, { "text-white": active })}>
      {children}
    </Nav.Link>
  </Link>
);
