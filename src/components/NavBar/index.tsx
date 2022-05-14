import { Auth } from "@supabase/ui";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";

import { useNavBar } from "./hooks";
import { NavBarLink } from "./NavBarLink";

type NavBarLinkType = {
  id: "home" | "reservations" | "tables" | "meals" | "songs" | "gifts";
  text: string;
  href: string;
};

type NavBarProps = {
  className?: string;
  active?: NavBarLinkType["id"];
};

const links: NavBarLinkType[] = [
  { text: "Home", id: "home", href: "/" },
  { text: "Reservations", id: "reservations", href: "/reservations" },
  { text: "Tables", id: "tables", href: "/tables" },
  { text: "Songs", id: "songs", href: "/songs" },
  { text: "Meals", id: "meals", href: "/meals" },
  { text: "Gifts", id: "gifts", href: "/gifts" }
];

export const NavBar = ({ className, active }: NavBarProps): JSX.Element => {
  const { handleSignOut } = useNavBar();
  const { user } = Auth.useUser();
  if (!user) {
    return <></>;
  }

  return (
    <BootstrapNavbar className={className} variant="dark" bg="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Text className="text-white">
          Signed in as: {user?.email}
        </BootstrapNavbar.Text>
        <BootstrapNavbar.Toggle aria-controls="navbar-controls" />
        <BootstrapNavbar.Collapse
          id="navbar-controls"
          className="justify-content-end"
        >
          <Nav>
            {links.map(({ id, text, href }) => (
              <NavBarLink
                key={id}
                className="me-3"
                href={href}
                active={active === id}
              >
                {text}
              </NavBarLink>
            ))}
            <Nav.Item>
              <Button onClick={handleSignOut}>Log out</Button>
            </Nav.Item>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
