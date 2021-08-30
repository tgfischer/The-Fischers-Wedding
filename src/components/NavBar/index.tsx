import { Auth } from "@supabase/ui";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  Button
} from "react-bootstrap";

import { ComponentProps } from "../types";

import { useNavBar } from "./hooks";
import { NavBarLink } from "./NavBarLink";

export const NavBar = ({ className }: ComponentProps): JSX.Element => {
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
            <NavBarLink className="me-3" href="/">
              Home
            </NavBarLink>
            <NavBarLink className="me-3" href="/reservations">
              Reservations
            </NavBarLink>
            <Nav.Item>
              <Button onClick={handleSignOut}>Log out</Button>
            </Nav.Item>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};
